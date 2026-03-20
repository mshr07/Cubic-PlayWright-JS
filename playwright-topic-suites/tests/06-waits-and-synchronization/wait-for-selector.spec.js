import { test, expect } from '@playwright/test';

test('waitForSelector(): wait for an element to appear', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await page.getByRole('button', { name: 'Toggle details' }).click();
  await page.waitForSelector('#details-panel');
  await expect(page.locator('#details-panel')).toBeVisible();
});

