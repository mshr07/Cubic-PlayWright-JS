import { test, expect } from '@playwright/test';

test('first test: open the app home page', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Playwright Training App' })).toBeVisible();
});

