import { test, expect } from '@playwright/test';
import { AuthClient } from '../../api-clients/AuthClient.js';

test('login and token flow: authenticate before protected calls', async ({ request }) => {
  const authClient = new AuthClient(request);
  const response = await authClient.login('asha@example.com', 'Password123');
  const body = await response.json();
  expect(body.accessToken).toBeTruthy();
});

