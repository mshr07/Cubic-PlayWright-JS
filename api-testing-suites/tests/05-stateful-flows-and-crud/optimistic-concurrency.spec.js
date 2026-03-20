import { test, expect } from '@playwright/test';

test('optimistic concurrency: send If-Match to prevent stale writes', async ({ request }) => {
  const firstResponse = await request.get('/api/validation/concurrency/resource');
  const etag = firstResponse.headers().etag;
  const updateResponse = await request.put('/api/validation/concurrency/resource', {
    headers: { 'If-Match': etag },
    data: { updatedBy: 'test-suite' }
  });
  const body = await updateResponse.json();
  expect(body.updated).toBeTruthy();
});

