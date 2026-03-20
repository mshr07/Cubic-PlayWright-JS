import { test, expect } from '@playwright/test';
import fs from 'fs';

const users = JSON.parse(
  fs.readFileSync(new URL('../../test-data/users.json', import.meta.url), 'utf-8')
);

test('JSON-based test data: load test values from a file', async ({ request }) => {
  const response = await request.post('/api/users', { data: users[0] });
  const body = await response.json();
  expect(body.data.email).toBe(users[0].email);
});

