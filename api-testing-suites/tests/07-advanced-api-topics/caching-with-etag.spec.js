import { test, expect } from '@playwright/test';

test('caching with ETag: validate conditional GET behavior', async ({ request }) => {
  const firstResponse = await request.get('/api/validation/cache/items/1');
  const etag = firstResponse.headers().etag;
  const secondResponse = await request.get('/api/validation/cache/items/1', {
    headers: { 'If-None-Match': etag }
  });
  expect(secondResponse.status()).toBe(304);
});

