import { test, expect } from '@playwright/test';

test('XML response validation: some enterprise APIs still return XML', async ({ request }) => {
  const response = await request.get('/api/validation/xml');
  const body = await response.text();
  expect(body).toContain('<status>ok</status>');
});

