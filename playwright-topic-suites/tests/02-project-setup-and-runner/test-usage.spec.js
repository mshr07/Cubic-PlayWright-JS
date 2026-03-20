import { test, expect } from '@playwright/test';

test('test() usage: each test should have one clear purpose', async ({ page }) => {
  await page.goto('/login.html');
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});

