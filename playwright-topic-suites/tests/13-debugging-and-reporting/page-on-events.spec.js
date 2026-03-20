import { test, expect } from '@playwright/test';

test('page.on events: listen for network activity', async ({ page }) => {
  let sawResponse = false;
  page.on('response', (response) => {
    if (response.url().includes('/api/products')) {
      sawResponse = true;
    }
  });
  await page.goto('/network-playground.html');
  await page.getByRole('button', { name: 'Load products' }).click();
  await expect.poll(() => sawResponse).toBeTruthy();
});

