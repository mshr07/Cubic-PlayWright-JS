import { test, expect } from '@playwright/test';

test('sorting: validate order-sensitive API responses', async ({ request }) => {
  const response = await request.get('/api/products?sort=price&order=asc');
  const body = await response.json();
  expect(body.data[0].price).toBeLessThan(body.data[1].price);
});

