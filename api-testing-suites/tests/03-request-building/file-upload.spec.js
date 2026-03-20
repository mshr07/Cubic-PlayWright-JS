import { test, expect } from '@playwright/test';

test('file upload: send binary content to an upload endpoint', async ({ request }) => {
  const response = await request.post('/api/files/upload', {
    headers: {
      'Content-Type': 'application/octet-stream',
      'X-File-Name': 'sample.txt'
    },
    data: Buffer.from('sample file body')
  });
  const body = await response.json();
  expect(body.fileName).toBe('sample.txt');
  expect(body.size).toBeGreaterThan(0);
});

