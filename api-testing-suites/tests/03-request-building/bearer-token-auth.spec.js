import { test, expect } from '@playwright/test';

test('bearer token auth: call a protected profile endpoint', async ({ request }) => {
  const response = await request.get('/api/auth/profile', {
    headers: { Authorization: 'Bearer training-access-token' }
  });
  expect(response.status()).toBe(200);
});

