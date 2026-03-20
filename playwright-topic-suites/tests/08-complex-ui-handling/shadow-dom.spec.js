import { test, expect } from '@playwright/test';

test('shadow DOM: Playwright can pierce open shadow roots', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await expect(page.locator('#shadow-host').locator('#shadow-action')).toHaveText('Shadow action');
});

