import { test, expect } from '@playwright/test';

test('toBeChecked(): verify checkbox state', async ({ page }) => {
  await page.goto('/locator-playground.html');
  const checkbox = page.locator('#subscribe');
  await checkbox.check();
  await expect(checkbox).toBeChecked();
});

