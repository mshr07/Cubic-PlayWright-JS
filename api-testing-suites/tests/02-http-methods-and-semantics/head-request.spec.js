import { test, expect } from '@playwright/test';

test('HEAD request: validate metadata without a response body', async ({ request }) => {
  const response = await request.head('/api/semantics/head-check');
  expect(response.status()).toBe(200);
  expect(response.headers()['x-health-check']).toBe('passed');
});

