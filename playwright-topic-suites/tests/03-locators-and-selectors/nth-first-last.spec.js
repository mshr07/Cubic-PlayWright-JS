import { test, expect } from '@playwright/test';

test('nth(), first(), and last(): reach repeated elements carefully', async ({ page }) => {
  await page.goto('/locator-playground.html');
  const items = page.locator('.topic-item');
  await expect(items.first()).toHaveText('Locators');
  await expect(items.nth(1)).toHaveText('Assertions');
  await expect(items.last()).toHaveText('Fixtures');
});

