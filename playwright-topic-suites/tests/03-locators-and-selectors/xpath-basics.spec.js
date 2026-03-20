import { test, expect } from '@playwright/test';

test('XPath basics: supported but usually not first choice', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await expect(page.locator('//table//tbody//tr')).toHaveCount(2);
});

