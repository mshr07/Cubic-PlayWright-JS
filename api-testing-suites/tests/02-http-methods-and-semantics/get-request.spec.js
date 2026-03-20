import { test, expect } from '@playwright/test';

test('GET request: fetch existing users', async ({ request }) => {
  const response = await request.get('/api/users');
  const body = await response.json();
  expect(body.data.length).toBeGreaterThan(0);
});

