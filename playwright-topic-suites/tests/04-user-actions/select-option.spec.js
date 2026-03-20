import { test, expect } from '@playwright/test';

test('selectOption(): work with dropdowns', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await page.locator('#department').selectOption('dev');
  await expect(page.locator('#department')).toHaveValue('dev');
});

