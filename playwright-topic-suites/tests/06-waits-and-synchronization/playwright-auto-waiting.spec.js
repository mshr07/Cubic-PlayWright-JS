import { test, expect } from '@playwright/test';

test('Playwright auto-waiting: actions wait for elements to be actionable', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await page.getByRole('button', { name: 'Toggle details' }).click();
  await expect(page.locator('#details-panel')).toBeVisible();
});

