import { test, expect } from '@playwright/test';

test('server error handling: validate 500 scenarios without brittle assertions', async ({ request }) => {
  const response = await request.get('/api/negative/server-error');
  expect(response.status()).toBe(500);
});

