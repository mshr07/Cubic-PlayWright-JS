import { test, expect } from '@playwright/test';

test('getByTestId(): good when product teams provide test ids', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await expect(page.getByTestId('save-button')).toBeVisible();
});

