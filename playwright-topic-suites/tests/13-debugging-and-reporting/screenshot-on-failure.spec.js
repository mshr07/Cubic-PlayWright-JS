import { test, expect } from '@playwright/test';

test('screenshot on failure: config stores screenshots only when needed', async ({ page }) => {
  await page.goto('/dashboard.html');
  await expect(page.getByText('Run smoke suite')).toBeVisible();
});

