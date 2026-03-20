import { test, expect } from '@playwright/test';

test('soft assertions: continue gathering failures in one test', async ({ page }) => {
  await page.goto('/dashboard.html');
  await expect.soft(page.getByText('Welcome')).toBeVisible();
  await expect.soft(page.locator('#task-list li')).toHaveCount(3);
});

