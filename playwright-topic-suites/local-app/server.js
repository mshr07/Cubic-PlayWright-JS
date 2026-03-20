import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');
const port = Number(process.env.PLAYWRIGHT_PORT || 3000);

const state = {
  users: [
    { id: 1, name: 'Asha', email: 'student1@example.com' },
    { id: 2, name: 'Vikram', email: 'student2@example.com' }
  ],
  products: [
    { id: 1, name: 'Keyboard', price: 999, category: 'hardware' },
    { id: 2, name: 'Mouse', price: 499, category: 'hardware' }
  ]
};

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(body));
}

function sendText(response, statusCode, body, contentType = 'text/plain') {
  response.writeHead(statusCode, { 'Content-Type': contentType });
  response.end(body);
}

function parseBody(request) {
  return new Promise((resolve) => {
    let raw = '';

    request.on('data', (chunk) => {
      raw += chunk;
    });

    request.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }

      resolve(JSON.parse(raw));
    });
  });
}

function serveStatic(requestPath, response) {
  const safePath = requestPath === '/' ? '/index.html' : requestPath;
  const filePath = path.join(publicDir, safePath);

  if (!filePath.startsWith(publicDir) || !fs.existsSync(filePath)) {
    sendText(response, 404, 'Not Found');
    return;
  }

  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.txt': 'text/plain'
  };

  sendText(response, 200, fs.readFileSync(filePath), contentTypes[ext] || 'application/octet-stream');
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://127.0.0.1:${port}`);

  if (url.pathname === '/health') {
    sendJson(response, 200, { status: 'ok' });
    return;
  }

  if (url.pathname === '/api/users' && request.method === 'GET') {
    sendJson(response, 200, { data: state.users, total: state.users.length });
    return;
  }

  if (url.pathname === '/api/users' && request.method === 'POST') {
    const body = await parseBody(request);
    const newUser = { id: Date.now(), ...body };
    sendJson(response, 201, { data: newUser });
    return;
  }

  if (url.pathname.startsWith('/api/users/') && request.method === 'PUT') {
    const id = Number(url.pathname.split('/').pop());
    const body = await parseBody(request);
    const user = { ...state.users.find((item) => item.id === id), ...body };
    sendJson(response, 200, { data: user });
    return;
  }

  if (url.pathname.startsWith('/api/users/') && request.method === 'PATCH') {
    const id = Number(url.pathname.split('/').pop());
    const body = await parseBody(request);
    const user = { ...state.users.find((item) => item.id === id), ...body };
    sendJson(response, 200, { data: user });
    return;
  }

  if (url.pathname.startsWith('/api/users/') && request.method === 'DELETE') {
    const id = Number(url.pathname.split('/').pop());
    sendJson(response, 200, { success: true, deletedId: id });
    return;
  }

  if (url.pathname === '/api/login' && request.method === 'POST') {
    const body = await parseBody(request);
    const success = body.email === 'student1@example.com' && body.password === 'Password123';
    sendJson(response, success ? 200 : 401, {
      success,
      token: success ? 'training-token-123' : null,
      message: success ? 'Login successful' : 'Invalid credentials'
    });
    return;
  }

  if (url.pathname === '/api/products' && request.method === 'GET') {
    const term = url.searchParams.get('term');
    const filteredProducts = term
      ? state.products.filter((product) => product.name.toLowerCase().includes(term.toLowerCase()))
      : state.products;

    sendJson(response, 200, { data: filteredProducts });
    return;
  }

  if (url.pathname === '/api/profile' && request.method === 'GET') {
    const authHeader = request.headers.authorization || '';
    sendJson(response, authHeader === 'Bearer training-token-123' ? 200 : 401, {
      authenticated: authHeader === 'Bearer training-token-123'
    });
    return;
  }

  if (url.pathname === '/api/slow' && request.method === 'GET') {
    setTimeout(() => sendJson(response, 200, { status: 'slow-response-ready' }), 800);
    return;
  }

  serveStatic(url.pathname, response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Training app running at http://127.0.0.1:${port}`);
});
