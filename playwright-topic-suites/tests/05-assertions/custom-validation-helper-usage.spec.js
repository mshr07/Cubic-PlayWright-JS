import { test, expect } from '@playwright/test';
import { expectSuccessResponse, expectUserShape } from '../../utils/custom-validators.js';

test('custom validation helper usage: centralize repeatable checks', async ({ request }) => {
  const response = await request.get('/api/users');
  const body = await response.json();
  expectSuccessResponse(body);
  expectUserShape(body.data[0]);
  expect(body.data.length).toBeGreaterThan(0);
});
