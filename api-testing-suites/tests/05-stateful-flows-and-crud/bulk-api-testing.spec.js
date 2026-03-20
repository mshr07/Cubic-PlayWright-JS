import { test, expect } from '@playwright/test';
import fs from 'fs';

const users = JSON.parse(
  fs.readFileSync(new URL('../../test-data/bulk-users.json', import.meta.url), 'utf-8')
);

test('bulk API testing: validate array payload handling', async ({ request }) => {
  const response = await request.post('/api/users/bulk', { data: users });
  const body = await response.json();
  expect(body.createdCount).toBe(3);
});

