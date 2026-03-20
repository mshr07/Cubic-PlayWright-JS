import { test, expect } from '@playwright/test';

test('HTML report usage: run npm run report after execution', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Playwright Training App' })).toBeVisible();
});

