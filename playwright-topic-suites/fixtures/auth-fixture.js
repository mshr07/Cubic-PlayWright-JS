import { test as base } from '@playwright/test';

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login.html');
    await page.getByLabel('Email').fill('student1@example.com');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('**/dashboard.html');
    await use(page);
  }
});

export { expect } from '@playwright/test';
