import { test, expect } from '@playwright/test';

test('aborting requests: simulate blocked traffic', async ({ page }) => {
  await page.route('**/api/products', async (route) => {
    await route.abort();
  });

  await page.goto('/network-playground.html');
  await page.getByRole('button', { name: 'Load products' }).click();
  await expect(page.locator('#api-result')).toHaveText('request failed');
});
