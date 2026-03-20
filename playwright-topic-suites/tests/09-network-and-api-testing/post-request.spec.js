import { test, expect } from '@playwright/test';

test('POST request: create a user', async ({ request }) => {
  const response = await request.post('/api/users', {
    data: { name: 'New User', email: 'new.user@example.com' }
  });
  const body = await response.json();
  expect(response.status()).toBe(201);
  expect(body.data.name).toBe('New User');
});

