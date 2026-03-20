import { test, expect } from '@playwright/test';

test('response time validation: track performance at a basic level', async ({ request }) => {
  const startedAt = Date.now();
  const response = await request.get('/api/users');
  const duration = Date.now() - startedAt;
  expect(response.ok()).toBeTruthy();
  expect(duration).toBeLessThan(1_500);
});

