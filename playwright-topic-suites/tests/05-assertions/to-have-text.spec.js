import { test, expect } from '@playwright/test';

test('toHaveText(): exact text assertion', async ({ page }) => {
  await page.goto('/dashboard.html');
  await expect(page.locator('#welcome-banner')).toHaveText('Welcome to the SDET dashboard');
});

