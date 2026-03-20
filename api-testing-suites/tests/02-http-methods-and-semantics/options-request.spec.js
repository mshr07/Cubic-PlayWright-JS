import { test, expect } from '@playwright/test';

test('OPTIONS request: inspect supported HTTP methods', async ({ request }) => {
  const response = await request.fetch('/api/semantics/options-check', { method: 'OPTIONS' });
  expect(response.status()).toBe(204);
  expect(response.headers().allow).toContain('OPTIONS');
});

