import { test, expect } from '@playwright/test';

test('APIRequestContext basics: the request fixture can call APIs directly', async ({ request }) => {
  const response = await request.get('/health');
  const body = await response.json();
  expect(body.status).toBe('ok');
});

