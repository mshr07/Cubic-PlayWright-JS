import { test, expect } from '@playwright/test';

test('intercepting requests: observe or control outgoing traffic', async ({ page }) => {
  let intercepted = false;
  await page.route('**/api/products', async (route) => {
    intercepted = true;
    await route.continue();
  });

  await page.goto('/network-playground.html');
  await page.getByRole('button', { name: 'Load products' }).click();
  expect(intercepted).toBeTruthy();
});

