import { test, expect } from '@playwright/test';

test('method not allowed: validate 405 responses and Allow headers', async ({ request }) => {
  const response = await request.post('/api/negative/method-not-allowed', {
    data: {}
  });
  expect(response.status()).toBe(405);
  expect(response.headers().allow).toBe('GET');
});

