import { test as base } from '@playwright/test';
import fs from 'fs';

const users = JSON.parse(
  fs.readFileSync(new URL('../test-data/users.json', import.meta.url), 'utf-8')
);

export const test = base.extend({
  usersData: async ({}, use) => {
    await use(users);
  }
});

export { expect } from '@playwright/test';

