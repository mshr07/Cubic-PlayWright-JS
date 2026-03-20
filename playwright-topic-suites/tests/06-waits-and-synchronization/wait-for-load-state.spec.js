import { test, expect } from '@playwright/test';

test('waitForLoadState(): useful after navigation or popup actions', async ({ page }) => {
  await page.goto('/dashboard.html');
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByText('Run smoke suite')).toBeVisible();
});

