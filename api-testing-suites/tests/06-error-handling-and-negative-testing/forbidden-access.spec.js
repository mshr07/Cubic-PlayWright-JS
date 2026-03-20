import { test, expect } from '@playwright/test';

test('forbidden access: authenticated does not always mean authorized', async ({ request }) => {
  const response = await request.get('/api/negative/forbidden');
  expect(response.status()).toBe(403);
});

