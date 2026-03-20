import { test, expect } from '@playwright/test';
import { UsersClient } from '../../api-clients/UsersClient.js';

test('GET request: fetch a list of users', async ({ request }) => {
  const usersClient = new UsersClient(request);
  const response = await usersClient.getAll();
  const body = await response.json();
  expect(body.data.length).toBeGreaterThan(0);
});

