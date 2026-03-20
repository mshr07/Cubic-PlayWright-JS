import { test, expect } from '@playwright/test';

test('protected order creation: combine auth and business payloads', async ({ request }) => {
  const response = await request.post('/api/orders', {
    headers: { Authorization: 'Bearer training-access-token' },
    data: {
      productId: 101,
      quantity: 2
    }
  });
  const body = await response.json();
  expect(body.data.status).toBe('created');
});

