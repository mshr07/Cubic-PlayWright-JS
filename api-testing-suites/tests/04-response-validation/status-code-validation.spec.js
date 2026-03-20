import { test, expect } from '@playwright/test';

test('status code validation: do not stop at body checks only', async ({ request }) => {
  const response = await request.get('/api/users');
  expect(response.status()).toBe(200);
});

