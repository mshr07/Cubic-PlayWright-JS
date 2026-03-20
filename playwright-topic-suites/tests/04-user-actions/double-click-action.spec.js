import { test, expect } from '@playwright/test';

test('dblclick(): trigger a double-click interaction', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await page.locator('#double-click-button').dblclick();
  await expect(page.locator('#double-click-result')).toHaveText('Double click successful');
});

