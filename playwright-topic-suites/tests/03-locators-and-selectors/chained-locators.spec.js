import { test, expect } from '@playwright/test';

test('chained locators: narrow the search step by step', async ({ page }) => {
  await page.goto('/locator-playground.html');
  const firstStatusCell = page.locator('table').locator('tbody tr').first().locator('td').last();
  await expect(firstStatusCell).toHaveText('Active');
});

