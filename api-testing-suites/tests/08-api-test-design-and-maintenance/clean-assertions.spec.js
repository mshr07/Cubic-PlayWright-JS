import { test, expect } from '@playwright/test';

test('clean assertions: validate business meaning, not every field blindly', async ({ request }) => {
  const response = await request.get('/api/products?search=keyboard');
  const body = await response.json();
  expect(body.data[0]).toEqual(
    expect.objectContaining({
      name: 'Keyboard',
      category: 'hardware'
    })
  );
});

