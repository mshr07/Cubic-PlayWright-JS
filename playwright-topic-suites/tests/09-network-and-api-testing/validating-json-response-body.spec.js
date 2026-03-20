import { test, expect } from '@playwright/test';

test('validating JSON response body: inspect nested fields', async ({ request }) => {
  const response = await request.get('/api/users');
  const body = await response.json();
  expect(body.data[0]).toEqual(expect.objectContaining({ email: expect.any(String) }));
});

