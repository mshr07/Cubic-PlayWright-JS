import { test, expect } from '@playwright/test';

test('unauthorized access: protected APIs should reject missing tokens', async ({ request }) => {
  const response = await request.get('/api/auth/profile');
  expect(response.status()).toBe(401);
});

