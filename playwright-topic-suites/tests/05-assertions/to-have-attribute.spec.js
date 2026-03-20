import { test, expect } from '@playwright/test';

test('toHaveAttribute(): verify HTML attributes', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await expect(page.locator('#file-input')).toHaveAttribute('type', 'file');
});

