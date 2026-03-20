import { test, expect } from '@playwright/test';

test('trace viewer generation: trace is captured on first retry by config', async ({ page }) => {
  await page.goto('/dashboard.html');
  await expect(page.getByText('Log defect')).toBeVisible();
});

