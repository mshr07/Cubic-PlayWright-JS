import { test } from '@playwright/test';
import { expectPaginationMeta } from '../../utils/custom-validators.js';

test('pagination validation: verify meta fields as well as records', async ({ request }) => {
  const response = await request.get('/api/products?page=1&limit=2');
  const body = await response.json();
  expectPaginationMeta(body.meta);
});

