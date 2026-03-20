import { test, expect } from '@playwright/test';

test('hover(): move the pointer over an element', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await page.locator('#primary-action').hover();
  await expect(page.locator('#primary-action')).toBeVisible();
});

