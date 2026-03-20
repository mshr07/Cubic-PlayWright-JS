import { test, expect } from '@playwright/test';

test('common flaky test fix: assert final UI state instead of racing the DOM', async ({ page }) => {
  await page.goto('/network-playground.html');
  await page.getByRole('button', { name: 'Load slow response' }).click();
  await expect(page.locator('#api-result')).toContainText('slow-response-ready');
});

