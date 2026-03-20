import { test, expect } from '@playwright/test';

test('PATCH request: partially update a resource', async ({ request }) => {
  const response = await request.patch('/api/users/1', {
    data: { role: 'architect' }
  });
  const body = await response.json();
  expect(body.data.role).toBe('architect');
});

