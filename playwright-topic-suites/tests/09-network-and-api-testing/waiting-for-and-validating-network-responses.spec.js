import { test, expect } from '@playwright/test';

test('waiting for and validating network responses: combine sync and assertion', async ({ page }) => {
  await page.goto('/network-playground.html');
  const responsePromise = page.waitForResponse('**/api/products');
  await page.getByRole('button', { name: 'Load products' }).click();
  const response = await responsePromise;
  const body = await response.json();
  expect(body.data.length).toBeGreaterThan(0);
});

