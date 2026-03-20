import { test, expect } from '@playwright/test';

test('not found: validate 404 behavior for missing resources', async ({ request }) => {
  const response = await request.get('/api/users/9999');
  expect(response.status()).toBe(404);
});

