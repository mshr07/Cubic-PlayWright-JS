import { test, expect } from '@playwright/test';

test('waiting for element states: visible state is often enough', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await page.getByRole('button', { name: 'Toggle details' }).click();
  await page.locator('#details-panel').waitFor({ state: 'visible' });
  await expect(page.locator('#details-panel')).toContainText('visible');
});

