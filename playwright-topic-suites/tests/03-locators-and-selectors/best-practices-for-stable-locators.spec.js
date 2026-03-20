import { test, expect } from '@playwright/test';

test('best practices for stable locators: prefer role, label, and test id', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await expect(page.getByRole('button', { name: 'Save changes' })).toBeVisible();
  await expect(page.getByLabel('Full name')).toBeVisible();
  await expect(page.getByTestId('save-button')).toBeVisible();
});

