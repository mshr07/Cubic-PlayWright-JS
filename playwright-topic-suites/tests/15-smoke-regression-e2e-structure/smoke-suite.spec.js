import { test, expect } from '@playwright/test';

test('@smoke smoke suite structure: keep only critical fast checks', async ({ page }) => {
  await page.goto('/login.html');
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});

