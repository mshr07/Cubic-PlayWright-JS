import { test, expect } from '@playwright/test';

test('modifying request before sending: continue with a changed URL', async ({ page }) => {
  await page.route('**/api/products?term=mouse', async (route) => {
    const newUrl = route.request().url().replace('term=mouse', 'term=keyboard');
    await route.continue({ url: newUrl });
  });

  await page.goto('/network-playground.html');
  await page.evaluate(() => fetch('/api/products?term=mouse').then((response) => response.json()).then((data) => {
    document.querySelector('#api-result').textContent = JSON.stringify(data);
  }));
  await expect(page.locator('#api-result')).toContainText('Keyboard');
});

