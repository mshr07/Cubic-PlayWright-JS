import { test, expect } from '@playwright/test';

test('first API test: ping the fundamentals endpoint', async ({ request }) => {
  const response = await request.get('/api/fundamentals/ping');
  const body = await response.json();
  expect(response.ok()).toBeTruthy();
  expect(body.message).toBe('pong');
});

