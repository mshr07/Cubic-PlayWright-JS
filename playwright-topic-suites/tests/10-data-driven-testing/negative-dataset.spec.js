import { test, expect } from '@playwright/test';
import fs from 'fs';

const negativeUsers = JSON.parse(
  fs.readFileSync(new URL('../../test-data/negative-users.json', import.meta.url), 'utf-8')
);

for (const user of negativeUsers) {
  test(`negative dataset: inspect invalid user shape ${user.email}`, async () => {
    expect(user.name.length === 0 || !user.email.includes('@')).toBeTruthy();
  });
}
