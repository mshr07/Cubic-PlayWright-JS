import { test, expect } from '@playwright/test';

test('POST request: create a resource', async ({ request }) => {
  const response = await request.post('/api/users', {
    data: { name: 'API Trainee', email: 'api.trainee@example.com', role: 'tester' }
  });
  expect(response.status()).toBe(201);
});

