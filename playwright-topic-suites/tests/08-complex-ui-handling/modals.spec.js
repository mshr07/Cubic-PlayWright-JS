import { test, expect } from '@playwright/test';

test('modals: open and close dialog-based UI', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await page.locator('#open-dialog').click();
  await expect(page.locator('#training-dialog')).toBeVisible();
  await page.locator('#close-dialog').click();
  await expect(page.locator('#training-dialog')).toBeHidden();
});

