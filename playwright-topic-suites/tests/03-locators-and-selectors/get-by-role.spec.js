import { test, expect } from '@playwright/test';

test('getByRole(): preferred semantic locator', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await expect(page.getByRole('button', { name: 'Save changes' })).toBeVisible();
});

