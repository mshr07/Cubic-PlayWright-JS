import { test, expect } from '@playwright/test';

test('search: validate partial keyword matching', async ({ request }) => {
  const response = await request.get('/api/products?search=course');
  const body = await response.json();
  expect(body.data[0].name).toContain('Course');
});

