import { test, expect } from '@playwright/test';

test('getByPlaceholder(): useful when placeholder text is stable', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await expect(page.getByPlaceholder('Enter full name')).toBeVisible();
});

