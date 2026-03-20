import { test, expect } from '@playwright/test';

test('path params: fetch one resource by id', async ({ request }) => {
  const response = await request.get('/api/users/1');
  const body = await response.json();
  expect(body.data.id).toBe(1);
});

