import { test, expect } from '@playwright/test';

test('toHaveTitle(): verify document title', async ({ page }) => {
  await page.goto('/dashboard.html');
  await expect(page).toHaveTitle('Dashboard');
});

