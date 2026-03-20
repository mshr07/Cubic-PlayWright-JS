import { test } from '@playwright/test';
import { expectUserContract } from '../../utils/custom-validators.js';

test('schema-like validation: centralize repeated contract checks', async ({ request }) => {
  const response = await request.get('/api/users/1');
  const body = await response.json();
  expectUserContract(body.data);
});

