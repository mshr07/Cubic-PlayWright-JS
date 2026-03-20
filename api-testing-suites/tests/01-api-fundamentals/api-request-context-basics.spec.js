import { test, expect } from '@playwright/test';

test('APIRequestContext basics: use request fixture without a browser page', async ({ request }) => {
  const response = await request.get('/health');
  expect(response.status()).toBe(200);
});

