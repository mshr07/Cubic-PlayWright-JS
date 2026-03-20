import { test, expect } from '@playwright/test';

test('toHaveURL(): verify navigation target', async ({ page }) => {
  await page.goto('/login.html');
  await expect(page).toHaveURL(/login\.html/);
});

