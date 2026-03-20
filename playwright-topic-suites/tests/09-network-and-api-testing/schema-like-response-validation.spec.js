import { test } from '@playwright/test';
import { expectSuccessResponse, expectUserShape } from '../../utils/custom-validators.js';

test('schema-like response validation with JS helpers', async ({ request }) => {
  const response = await request.get('/api/users');
  const body = await response.json();
  expectSuccessResponse(body);
  expectUserShape(body.data[0]);
});

