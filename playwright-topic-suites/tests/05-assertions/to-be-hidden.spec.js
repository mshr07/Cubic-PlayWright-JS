import { test, expect } from '@playwright/test';

test('toBeHidden(): confirm hidden elements are not displayed', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await expect(page.locator('#details-panel')).toBeHidden();
});

