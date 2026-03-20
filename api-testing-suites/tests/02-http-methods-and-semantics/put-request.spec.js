import { test, expect } from '@playwright/test';

test('PUT request: replace a full resource representation', async ({ request }) => {
  const response = await request.put('/api/users/1', {
    data: { name: 'Updated Asha', email: 'updated.asha@example.com', role: 'lead' }
  });
  const body = await response.json();
  expect(body.data.name).toBe('Updated Asha');
});

