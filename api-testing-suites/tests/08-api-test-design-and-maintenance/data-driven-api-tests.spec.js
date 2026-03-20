import { test, expect } from '@playwright/test';
import fs from 'fs';

const users = JSON.parse(
  fs.readFileSync(new URL('../../test-data/users.json', import.meta.url), 'utf-8')
);

for (const user of users) {
  test(`data-driven API tests: create user ${user.email}`, async ({ request }) => {
    const response = await request.post('/api/users', { data: user });
    expect(response.status()).toBe(201);
  });
}

