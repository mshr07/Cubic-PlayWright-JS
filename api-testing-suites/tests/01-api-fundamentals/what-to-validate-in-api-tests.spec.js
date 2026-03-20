import { test, expect } from '@playwright/test';
import { expectJsonContentType } from '../../utils/custom-validators.js';

test('API basics: validate status, headers, and body together', async ({ request }) => {
  const response = await request.get('/api/users');
  const body = await response.json();
  expect(response.status()).toBe(200);
  expectJsonContentType(response);
  expect(body.total).toBeGreaterThan(0);
});

