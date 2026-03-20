import { test, expect } from '@playwright/test';

test('file download validation: verify attachment headers and content', async ({ request }) => {
  const response = await request.get('/api/files/download');
  const body = await response.text();
  expect(response.headers()['content-disposition']).toContain('users-report.csv');
  expect(body).toContain('Asha');
});

