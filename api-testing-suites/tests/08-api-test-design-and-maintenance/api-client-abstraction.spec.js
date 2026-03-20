import { test, expect } from '@playwright/test';
import { UsersClient } from '../../api-clients/UsersClient.js';

test('API client abstraction: keep endpoint knowledge out of specs when it repeats', async ({ request }) => {
  const client = new UsersClient(request);
  const response = await client.list();
  const body = await response.json();
  expect(body.total).toBeGreaterThan(0);
});

