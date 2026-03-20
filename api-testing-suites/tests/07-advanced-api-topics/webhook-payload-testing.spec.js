import { test, expect } from '@playwright/test';
import fs from 'fs';

const eventPayload = JSON.parse(
  fs.readFileSync(new URL('../../test-data/webhook-event.json', import.meta.url), 'utf-8')
);

test('webhook payload testing: validate event delivery contracts', async ({ request }) => {
  const response = await request.post('/api/advanced/webhook/events', {
    data: eventPayload
  });
  const body = await response.json();
  expect(body.eventType).toBe('build.completed');
});

