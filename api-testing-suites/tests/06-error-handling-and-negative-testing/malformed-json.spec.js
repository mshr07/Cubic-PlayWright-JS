import { test, expect } from '@playwright/test';

test('malformed JSON: raw invalid payloads should be rejected', async ({ request }) => {
  const response = await request.fetch('/api/request/raw-json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    postData: Buffer.from('{"brokenJson":')
  });
  expect(response.status()).toBe(400);
});
