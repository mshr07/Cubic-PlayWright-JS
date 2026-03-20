import { test, expect } from '@playwright/test';

test('filtering: reduce results using business filters', async ({ request }) => {
  const response = await request.get('/api/products?category=learning');
  const body = await response.json();
  expect(body.data[0].category).toBe('learning');
});

