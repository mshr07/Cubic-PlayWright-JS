import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('parallel execution: first independent test', async ({ page }) => {
  await page.goto('/dashboard.html');
  await expect(page.getByText('Review test report')).toBeVisible();
});

test('parallel execution: second independent test', async ({ page }) => {
  await page.goto('/dashboard.html');
  await expect(page.getByText('Log defect')).toBeVisible();
});

