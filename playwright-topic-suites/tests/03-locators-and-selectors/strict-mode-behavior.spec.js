import { test, expect } from '@playwright/test';

test('strict mode behavior: Playwright expects actions to target one element', async ({ page }) => {
  await page.goto('/locator-playground.html');
  const repeatedItems = page.locator('.topic-item');
  await expect(repeatedItems).toHaveCount(3);
});

