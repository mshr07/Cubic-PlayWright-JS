import { test, expect } from '@playwright/test';

test('naming conventions for enterprise-scale suites should be descriptive and consistent', async ({ page }) => {
  await page.goto('/dashboard.html');
  await expect(page.getByText('Log defect')).toBeVisible();
});
