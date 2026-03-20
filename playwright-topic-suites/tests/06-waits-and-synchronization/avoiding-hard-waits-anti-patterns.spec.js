import { test, expect } from '@playwright/test';

test('avoiding hard waits: prefer assertions over fixed timeouts', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await page.getByRole('button', { name: 'Toggle details' }).click();
  await expect(page.locator('#details-panel')).toBeVisible();
});

