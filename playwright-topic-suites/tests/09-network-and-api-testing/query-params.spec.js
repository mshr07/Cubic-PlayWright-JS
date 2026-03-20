import { test, expect } from '@playwright/test';

test('query params: search with URL parameters', async ({ request }) => {
  const response = await request.get('/api/products?term=mouse');
  const body = await response.json();
  expect(body.data[0].name).toBe('Mouse');
});

