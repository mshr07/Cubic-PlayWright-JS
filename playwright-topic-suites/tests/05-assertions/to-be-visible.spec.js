import { test, expect } from '@playwright/test';

test('toBeVisible(): verify visible UI elements', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await expect(page.getByRole('button', { name: 'Save changes' })).toBeVisible();
});

