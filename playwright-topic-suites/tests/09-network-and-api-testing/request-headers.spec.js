import { test, expect } from '@playwright/test';

test('request headers: send custom headers with API calls', async ({ request }) => {
  const response = await request.get('/api/profile', {
    headers: {
      Authorization: 'Bearer training-token-123'
    }
  });
  const body = await response.json();
  expect(body.authenticated).toBeTruthy();
});

