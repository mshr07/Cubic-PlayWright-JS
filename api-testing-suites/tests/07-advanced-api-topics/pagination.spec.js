import { test, expect } from '@playwright/test';

test('pagination: validate limited record windows', async ({ request }) => {
  const response = await request.get('/api/products?page=1&limit=2');
  const body = await response.json();
  expect(body.data).toHaveLength(2);
});

