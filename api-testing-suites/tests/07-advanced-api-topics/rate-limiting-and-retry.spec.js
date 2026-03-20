import { test, expect } from '@playwright/test';

test('rate limiting and retry: retry after transient 429 responses', async ({ request }) => {
  const retryKey = `retry-${Date.now()}`;
  let response;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    response = await request.get('/api/advanced/transient', {
      headers: { 'X-Retry-Key': retryKey }
    });

    if (response.status() === 200) {
      break;
    }
  }

  const body = await response.json();
  expect(body.recovered).toBeTruthy();
});

