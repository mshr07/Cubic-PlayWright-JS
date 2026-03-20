import { test, expect } from '@playwright/test';

test('toContainText(): partial text assertion', async ({ page }) => {
  await page.goto('/dashboard.html');
  await expect(page.locator('#welcome-banner')).toContainText('SDET dashboard');
});

