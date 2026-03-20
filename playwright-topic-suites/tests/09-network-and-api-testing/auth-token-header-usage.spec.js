import { test, expect } from '@playwright/test';

test('auth token/header usage: verify authorized access', async ({ request }) => {
  const token = 'training-token-123';
  const response = await request.get('/api/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
  expect(response.status()).toBe(200);
});

