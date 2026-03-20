import http from 'http';
import { randomUUID } from 'crypto';

const port = Number(process.env.API_TESTING_PORT || 3100);

const state = {
  users: [
    { id: 1, name: 'Asha', email: 'asha@example.com', role: 'tester' },
    { id: 2, name: 'Vikram', email: 'vikram@example.com', role: 'qa' },
    { id: 3, name: 'Mira', email: 'mira@example.com', role: 'sdet' }
  ],
  products: [
    { id: 101, name: 'Keyboard', category: 'hardware', price: 999 },
    { id: 102, name: 'Mouse', category: 'hardware', price: 499 },
    { id: 103, name: 'Monitor', category: 'hardware', price: 7999 },
    { id: 104, name: 'Postman Course', category: 'learning', price: 1999 }
  ],
  orders: [],
  asyncJobs: new Map(),
  transientCalls: new Map(),
  resourceVersion: 1
};

function sendJson(response, status, body, headers = {}) {
  response.writeHead(status, { 'Content-Type': 'application/json', ...headers });
  response.end(JSON.stringify(body));
}

function sendCsv(response, status, body, filename) {
  response.writeHead(status, {
    'Content-Type': 'text/csv',
    'Content-Disposition': `attachment; filename="${filename}"`
  });
  response.end(body);
}

function parseJson(request) {
  return new Promise((resolve, reject) => {
    let raw = '';

    request.on('data', (chunk) => {
      raw += chunk;
    });

    request.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
  });
}

function parseRawBody(request) {
  return new Promise((resolve) => {
    const chunks = [];

    request.on('data', (chunk) => {
      chunks.push(chunk);
    });

    request.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
  });
}

function requireBearerToken(request, response) {
  const authHeader = request.headers.authorization || '';

  if (authHeader !== 'Bearer training-access-token') {
    sendJson(response, 401, { error: 'Unauthorized' });
    return false;
  }

  return true;
}

function validateUserPayload(body) {
  return body.name && body.email && body.email.includes('@');
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://127.0.0.1:${port}`);

  if (url.pathname === '/health') {
    sendJson(response, 200, { status: 'ok' });
    return;
  }

  if (url.pathname === '/api/fundamentals/ping' && request.method === 'GET') {
    sendJson(response, 200, { message: 'pong' });
    return;
  }

  if (url.pathname === '/api/auth/login' && request.method === 'POST') {
    const body = await parseJson(request).catch((error) => {
      sendJson(response, 400, { error: error.message });
      return null;
    });
    if (!body) return;

    const valid = body.email === 'asha@example.com' && body.password === 'Password123';
    sendJson(response, valid ? 200 : 401, {
      success: valid,
      accessToken: valid ? 'training-access-token' : null,
      refreshToken: valid ? 'training-refresh-token' : null,
      message: valid ? 'Login successful' : 'Invalid credentials'
    });
    return;
  }

  if (url.pathname === '/api/auth/refresh' && request.method === 'POST') {
    const body = await parseJson(request).catch(() => null);
    const valid = body?.refreshToken === 'training-refresh-token';
    sendJson(response, valid ? 200 : 401, {
      accessToken: valid ? 'training-access-token' : null
    });
    return;
  }

  if (url.pathname === '/api/auth/profile' && request.method === 'GET') {
    if (!requireBearerToken(request, response)) return;
    sendJson(response, 200, { id: 1, email: 'asha@example.com', role: 'tester' });
    return;
  }

  if (url.pathname === '/api/auth/basic' && request.method === 'GET') {
    const authHeader = request.headers.authorization || '';
    const expected = `Basic ${Buffer.from('trainer:playwright').toString('base64')}`;
    sendJson(response, authHeader === expected ? 200 : 401, { authenticated: authHeader === expected });
    return;
  }

  if (url.pathname === '/api/semantics/head-check' && request.method === 'HEAD') {
    response.writeHead(200, { 'X-Health-Check': 'passed' });
    response.end();
    return;
  }

  if (url.pathname === '/api/semantics/options-check' && request.method === 'OPTIONS') {
    response.writeHead(204, { Allow: 'GET,POST,OPTIONS' });
    response.end();
    return;
  }

  if (url.pathname === '/api/users' && request.method === 'GET') {
    sendJson(response, 200, { data: state.users, total: state.users.length });
    return;
  }

  if (url.pathname === '/api/users' && request.method === 'POST') {
    const body = await parseJson(request).catch((error) => {
      sendJson(response, 400, { error: error.message });
      return null;
    });
    if (!body) return;

    if (!validateUserPayload(body)) {
      sendJson(response, 422, { error: 'Invalid user payload' });
      return;
    }

    const user = { id: Date.now(), ...body };
    sendJson(response, 201, { data: user });
    return;
  }

  if (url.pathname.startsWith('/api/users/') && request.method === 'GET') {
    const id = Number(url.pathname.split('/').pop());
    const user = state.users.find((item) => item.id === id);
    sendJson(response, user ? 200 : 404, user ? { data: user } : { error: 'User not found' });
    return;
  }

  if (url.pathname.startsWith('/api/users/') && request.method === 'PUT') {
    const id = Number(url.pathname.split('/').pop());
    const existing = state.users.find((item) => item.id === id);
    const body = await parseJson(request).catch(() => null);

    if (!existing) {
      sendJson(response, 404, { error: 'User not found' });
      return;
    }

    if (!validateUserPayload(body)) {
      sendJson(response, 422, { error: 'Invalid user payload' });
      return;
    }

    sendJson(response, 200, { data: { id, ...body } });
    return;
  }

  if (url.pathname.startsWith('/api/users/') && request.method === 'PATCH') {
    const id = Number(url.pathname.split('/').pop());
    const existing = state.users.find((item) => item.id === id);
    const body = await parseJson(request).catch(() => null);
    sendJson(response, existing ? 200 : 404, existing ? { data: { ...existing, ...body } } : { error: 'User not found' });
    return;
  }

  if (url.pathname.startsWith('/api/users/') && request.method === 'DELETE') {
    const id = Number(url.pathname.split('/').pop());
    sendJson(response, 200, { deleted: true, id });
    return;
  }

  if (url.pathname === '/api/users/bulk' && request.method === 'POST') {
    const body = await parseJson(request).catch(() => []);
    sendJson(response, 201, { createdCount: Array.isArray(body) ? body.length : 0 });
    return;
  }

  if (url.pathname === '/api/products' && request.method === 'GET') {
    let products = [...state.products];
    const page = Number(url.searchParams.get('page') || 1);
    const limit = Number(url.searchParams.get('limit') || products.length);
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    const sort = url.searchParams.get('sort');
    const order = url.searchParams.get('order') || 'asc';

    if (category) {
      products = products.filter((product) => product.category === category);
    }

    if (search) {
      products = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (sort) {
      products.sort((first, second) => {
        const direction = order === 'desc' ? -1 : 1;
        if (first[sort] < second[sort]) return -1 * direction;
        if (first[sort] > second[sort]) return 1 * direction;
        return 0;
      });
    }

    const start = (page - 1) * limit;
    const paged = products.slice(start, start + limit);

    sendJson(response, 200, {
      data: paged,
      meta: {
        page,
        limit,
        total: products.length
      }
    });
    return;
  }

  if (url.pathname === '/api/orders' && request.method === 'POST') {
    if (!requireBearerToken(request, response)) return;
    const body = await parseJson(request).catch(() => null);
    const order = { id: randomUUID(), ...body, status: 'created' };
    state.orders.push(order);
    sendJson(response, 201, { data: order });
    return;
  }

  if (url.pathname === '/api/headers/echo' && request.method === 'GET') {
    sendJson(response, 200, {
      headers: {
        correlationId: request.headers['x-correlation-id'] || null,
        trainingSuite: request.headers['x-training-suite'] || null
      }
    });
    return;
  }

  if (url.pathname === '/api/request/form' && request.method === 'POST') {
    const raw = (await parseRawBody(request)).toString();
    sendJson(response, 200, { raw });
    return;
  }

  if (url.pathname === '/api/request/raw-json' && request.method === 'POST') {
    const raw = await parseRawBody(request);
    try {
      const parsed = JSON.parse(raw.toString());
      sendJson(response, 200, { parsed });
    } catch {
      sendJson(response, 400, { error: 'Invalid JSON body' });
    }
    return;
  }

  if (url.pathname === '/api/files/upload' && request.method === 'POST') {
    const fileBody = await parseRawBody(request);
    sendJson(response, 201, {
      fileName: request.headers['x-file-name'] || 'unknown',
      size: fileBody.length
    });
    return;
  }

  if (url.pathname === '/api/files/download' && request.method === 'GET') {
    sendCsv(response, 200, 'id,name\n1,Asha\n2,Vikram\n', 'users-report.csv');
    return;
  }

  if (url.pathname === '/api/validation/xml' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/xml' });
    response.end('<response><status>ok</status><message>xml-ready</message></response>');
    return;
  }

  if (url.pathname === '/api/validation/versioned' && request.method === 'GET') {
    const version = request.headers['accept-version'] || '1';
    sendJson(response, 200, { version, feature: version === '2' ? 'enhanced-contract' : 'basic-contract' });
    return;
  }

  if (url.pathname === '/api/validation/cache/items/1' && request.method === 'GET') {
    const etag = '"item-1-v1"';
    if (request.headers['if-none-match'] === etag) {
      response.writeHead(304, { ETag: etag });
      response.end();
      return;
    }

    sendJson(response, 200, { data: { id: 1, name: 'cached item' } }, { ETag: etag });
    return;
  }

  if (url.pathname === '/api/validation/concurrency/resource' && request.method === 'GET') {
    const etag = `"resource-v${state.resourceVersion}"`;
    sendJson(response, 200, { data: { version: state.resourceVersion } }, { ETag: etag });
    return;
  }

  if (url.pathname === '/api/validation/concurrency/resource' && request.method === 'PUT') {
    const expected = `"resource-v${state.resourceVersion}"`;
    const ifMatch = request.headers['if-match'];

    if (ifMatch !== expected) {
      sendJson(response, 412, { error: 'Precondition failed' });
      return;
    }

    state.resourceVersion += 1;
    sendJson(response, 200, { updated: true, version: state.resourceVersion });
    return;
  }

  if (url.pathname === '/api/advanced/redirect-me' && request.method === 'GET') {
    response.writeHead(302, { Location: '/api/advanced/final-destination' });
    response.end();
    return;
  }

  if (url.pathname === '/api/advanced/final-destination' && request.method === 'GET') {
    sendJson(response, 200, { reached: true });
    return;
  }

  if (url.pathname === '/api/advanced/transient' && request.method === 'GET') {
    const key = request.headers['x-retry-key'] || 'default';
    const count = (state.transientCalls.get(key) || 0) + 1;
    state.transientCalls.set(key, count);

    if (count < 3) {
      sendJson(response, 429, { error: 'Rate limited', attempt: count }, { 'Retry-After': '1' });
      return;
    }

    sendJson(response, 200, { recovered: true, attempt: count });
    return;
  }

  if (url.pathname === '/api/advanced/async-jobs' && request.method === 'POST') {
    const id = randomUUID();
    state.asyncJobs.set(id, 0);
    sendJson(response, 202, { jobId: id, status: 'accepted' });
    return;
  }

  if (url.pathname.startsWith('/api/advanced/async-jobs/') && request.method === 'GET') {
    const id = url.pathname.split('/').pop();
    const pollCount = (state.asyncJobs.get(id) || 0) + 1;
    state.asyncJobs.set(id, pollCount);
    sendJson(response, 200, {
      jobId: id,
      status: pollCount >= 3 ? 'completed' : 'pending'
    });
    return;
  }

  if (url.pathname === '/api/advanced/webhook/events' && request.method === 'POST') {
    const body = await parseJson(request).catch(() => null);
    sendJson(response, 202, { accepted: true, eventType: body?.eventType || 'unknown' });
    return;
  }

  if (url.pathname === '/api/negative/forbidden' && request.method === 'GET') {
    sendJson(response, 403, { error: 'Forbidden' });
    return;
  }

  if (url.pathname === '/api/negative/server-error' && request.method === 'GET') {
    sendJson(response, 500, { error: 'Internal server error' });
    return;
  }

  if (url.pathname === '/api/negative/method-not-allowed') {
    if (request.method !== 'GET') {
      sendJson(response, 405, { error: 'Method not allowed' }, { Allow: 'GET' });
      return;
    }

    sendJson(response, 200, { ok: true });
    return;
  }

  sendJson(response, 404, { error: 'Route not found' });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`API training server running at http://127.0.0.1:${port}`);
});
