import { test, expect } from '@playwright/test';

test('mocking responses: return controlled data with route.fulfill', async ({ page }) => {
  await page.route('**/api/products', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [{ id: 99, name: 'Mock Product' }] })
    });
  });

  await page.goto('/network-playground.html');
  await page.getByRole('button', { name: 'Load products' }).click();
  await expect(page.locator('#api-result')).toContainText('Mock Product');
});

