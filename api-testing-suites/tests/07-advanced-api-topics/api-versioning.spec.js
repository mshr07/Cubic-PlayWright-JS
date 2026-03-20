import { test, expect } from '@playwright/test';

test('API versioning: validate behavior changes by requested version', async ({ request }) => {
  const response = await request.get('/api/validation/versioned', {
    headers: { 'Accept-Version': '2' }
  });
  const body = await response.json();
  expect(body.feature).toBe('enhanced-contract');
});

