import { test, expect } from '@playwright/test';

test('JSON body validation: verify meaningful fields and values', async ({ request }) => {
  const response = await request.get('/api/users');
  const body = await response.json();
  expect(body.data[0].email).toContain('@');
});

