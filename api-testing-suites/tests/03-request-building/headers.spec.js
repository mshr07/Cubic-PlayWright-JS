import { test, expect } from '@playwright/test';

test('custom headers: send observability and tracing information', async ({ request }) => {
  const response = await request.get('/api/headers/echo', {
    headers: { 'X-Correlation-Id': 'trace-101' }
  });
  const body = await response.json();
  expect(body.headers.correlationId).toBe('trace-101');
});

