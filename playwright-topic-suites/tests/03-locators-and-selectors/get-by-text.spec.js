import { test, expect } from '@playwright/test';

test('getByText(): locate by visible text', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await expect(page.getByText('Assertions')).toBeVisible();
});

