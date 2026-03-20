import { test, expect } from '@playwright/test';

const taskNames = ['Review test report', 'Run smoke suite', 'Log defect'];

for (const taskName of taskNames) {
  test(`iterating over arrays: dashboard contains ${taskName}`, async ({ page }) => {
    await page.goto('/dashboard.html');
    await expect(page.getByText(taskName)).toBeVisible();
  });
}

