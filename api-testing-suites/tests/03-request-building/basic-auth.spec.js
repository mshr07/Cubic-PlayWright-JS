import { test, expect } from '@playwright/test';

test('basic auth: use Authorization header for simple protected APIs', async ({ request }) => {
  const token = Buffer.from('trainer:playwright').toString('base64');
  const response = await request.get('/api/auth/basic', {
    headers: { Authorization: `Basic ${token}` }
  });
  const body = await response.json();
  expect(body.authenticated).toBeTruthy();
});

