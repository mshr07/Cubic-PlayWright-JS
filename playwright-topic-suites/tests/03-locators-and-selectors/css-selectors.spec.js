import { test, expect } from '@playwright/test';

test('CSS selectors: useful when semantics are unavailable', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await expect(page.locator('ul#dynamic-list > li')).toHaveCount(3);
});

