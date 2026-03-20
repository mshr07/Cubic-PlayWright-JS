import { test, expect } from '@playwright/test';

test('raw JSON body: useful when building payloads manually', async ({ request }) => {
  const response = await request.post('/api/request/raw-json', {
    data: { suite: 'api', status: 'passed' }
  });
  const body = await response.json();
  expect(body.parsed.status).toBe('passed');
});

