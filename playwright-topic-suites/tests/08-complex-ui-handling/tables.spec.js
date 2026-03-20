import { test, expect } from '@playwright/test';

test('tables: validate row and cell values', async ({ page }) => {
  await page.goto('/locator-playground.html');
  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(2);
  await expect(rows.first().locator('td').first()).toHaveText('Asha');
});

