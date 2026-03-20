import { test as base } from '@playwright/test';
import { getBaseURL } from '../utils/env.js';

export const test = base.extend({
  appBaseUrl: async ({}, use) => {
    await use(getBaseURL());
  },
  sampleUser: async ({}, use) => {
    await use({ email: 'student1@example.com', password: 'Password123' });
  }
});

export { expect } from '@playwright/test';

