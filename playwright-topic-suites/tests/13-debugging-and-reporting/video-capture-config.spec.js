import { test, expect } from '@playwright/test';

test('video capture config: retained on failure for investigation', async ({ page }) => {
  await page.goto('/dashboard.html');
  await expect(page.locator('#task-list li')).toHaveCount(3);
});

