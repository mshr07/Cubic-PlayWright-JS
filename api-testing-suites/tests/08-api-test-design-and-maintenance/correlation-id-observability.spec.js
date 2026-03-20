import { test, expect } from '@playwright/test';

test('correlation ids: useful for tracing failures through distributed systems', async ({ request }) => {
  const response = await request.get('/api/headers/echo', {
    headers: { 'X-Correlation-Id': 'corr-500' }
  });
  const body = await response.json();
  expect(body.headers.correlationId).toBe('corr-500');
});

