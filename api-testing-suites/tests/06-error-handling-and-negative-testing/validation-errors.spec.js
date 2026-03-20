import { test, expect } from '@playwright/test';

test('validation errors: invalid request bodies should fail clearly', async ({ request }) => {
  const response = await request.post('/api/users', {
    data: { name: '', email: 'broken-email' }
  });
  expect(response.status()).toBe(422);
});

