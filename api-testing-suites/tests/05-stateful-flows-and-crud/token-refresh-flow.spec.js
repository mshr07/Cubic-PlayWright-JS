import { test, expect } from '@playwright/test';
import { AuthClient } from '../../api-clients/AuthClient.js';

test('token refresh flow: request a new access token from a refresh token', async ({ request }) => {
  const authClient = new AuthClient(request);
  const response = await authClient.refresh('training-refresh-token');
  const body = await response.json();
  expect(body.accessToken).toBe('training-access-token');
});

