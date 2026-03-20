import { test, expect } from '@playwright/test';

test.describe('test.describe groups related checks', () => {
  test('login page has a heading', async ({ page }) => {
    await page.goto('/login.html');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});

