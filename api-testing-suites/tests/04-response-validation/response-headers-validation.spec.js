import { test } from '@playwright/test';
import { expectJsonContentType } from '../../utils/custom-validators.js';

test('response headers validation: verify content type and metadata', async ({ request }) => {
  const response = await request.get('/api/users');
  expectJsonContentType(response);
});

