import { test, expect } from '@playwright/test';
import { pollUntil } from '../../utils/retry-helper.js';

test('async job polling: keep checking until background work finishes', async ({ request }) => {
  const createResponse = await request.post('/api/advanced/async-jobs');
  const created = await createResponse.json();

  const finalJob = await pollUntil(
    async () => {
      const response = await request.get(`/api/advanced/async-jobs/${created.jobId}`);
      return response.json();
    },
    (job) => job.status === 'completed',
    5
  );

  expect(finalJob.status).toBe('completed');
});

