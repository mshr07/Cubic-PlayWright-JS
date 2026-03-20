import { test, expect } from '@playwright/test';

test('@regression regression suite structure: broader coverage after changes', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await expect(page.locator('.topic-item')).toHaveCount(3);
});

