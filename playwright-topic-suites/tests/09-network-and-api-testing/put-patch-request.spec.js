import { test, expect } from '@playwright/test';

test('PUT and PATCH request: update an existing user', async ({ request }) => {
  const putResponse = await request.put('/api/users/1', {
    data: { name: 'Updated User', email: 'updated@example.com' }
  });
  expect(putResponse.ok()).toBeTruthy();

  const patchResponse = await request.patch('/api/users/1', {
    data: { name: 'Patched User' }
  });
  const body = await patchResponse.json();
  expect(body.data.name).toBe('Patched User');
});

