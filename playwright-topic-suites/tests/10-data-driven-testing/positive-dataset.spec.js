import { test, expect } from '@playwright/test';
import fs from 'fs';

const positiveUsers = JSON.parse(
  fs.readFileSync(new URL('../../test-data/users.json', import.meta.url), 'utf-8')
);

for (const user of positiveUsers) {
  test(`positive dataset: create valid user ${user.email}`, async ({ request }) => {
    const response = await request.post('/api/users', { data: user });
    expect(response.status()).toBe(201);
  });
}

