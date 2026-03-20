import { test, expect } from '@playwright/test';

test('redirect handling: some APIs return 3xx before the final resource', async ({ request }) => {
  const response = await request.get('/api/advanced/redirect-me');
  const body = await response.json();
  expect(body.reached).toBeTruthy();
});

