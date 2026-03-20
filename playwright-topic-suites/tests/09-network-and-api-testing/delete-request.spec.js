import { test, expect } from '@playwright/test';

test('DELETE request: remove a user', async ({ request }) => {
  const response = await request.delete('/api/users/2');
  const body = await response.json();
  expect(body.success).toBeTruthy();
});

