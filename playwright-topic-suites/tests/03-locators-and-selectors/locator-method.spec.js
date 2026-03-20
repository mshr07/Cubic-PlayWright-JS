import { test, expect } from '@playwright/test';

test('locator(): generic locator creation', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await expect(page.locator('#primary-action')).toHaveText('Save changes');
});

