import { test, expect } from '@playwright/test';

test('form-urlencoded body: useful for legacy APIs and auth flows', async ({ request }) => {
  const response = await request.post('/api/request/form', {
    form: {
      clientId: 'training-client',
      scope: 'read write'
    }
  });
  const body = await response.json();
  expect(body.raw).toContain('clientId=training-client');
});

