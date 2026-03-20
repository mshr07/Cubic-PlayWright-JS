import { test, expect } from '@playwright/test';

test('waitForResponse(): synchronize with network calls', async ({ page }) => {
  await page.goto('/network-playground.html');
  const responsePromise = page.waitForResponse('**/api/slow');
  await page.getByRole('button', { name: 'Load slow response' }).click();
  const response = await responsePromise;
  const body = await response.json();
  expect(body.status).toBe('slow-response-ready');
});

