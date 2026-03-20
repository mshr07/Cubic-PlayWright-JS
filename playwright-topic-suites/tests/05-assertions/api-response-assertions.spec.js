import { test, expect } from '@playwright/test';

test('API response assertions: validate status and body', async ({ request }) => {
  const response = await request.get('/api/users');
  const body = await response.json();
  expect(response.ok()).toBeTruthy();
  expect(body.total).toBeGreaterThan(0);
});

