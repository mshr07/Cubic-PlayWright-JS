import { test, expect } from '@playwright/test';

test('DELETE request: mark a resource as removed', async ({ request }) => {
  const response = await request.delete('/api/users/2');
  const body = await response.json();
  expect(body.deleted).toBeTruthy();
});

