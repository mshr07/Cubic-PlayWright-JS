import { test, expect } from '@playwright/test';

test('check() and uncheck(): handle checkbox inputs', async ({ page }) => {
  await page.goto('/locator-playground.html');
  const checkbox = page.locator('#subscribe');
  await checkbox.check();
  await expect(checkbox).toBeChecked();
  await checkbox.uncheck();
  await expect(checkbox).not.toBeChecked();
});

