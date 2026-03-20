import { test, expect } from '@playwright/test';

test('waitForURL(): wait for navigation to complete', async ({ page }) => {
  await page.goto('/login.html');
  await page.getByLabel('Email').fill('student1@example.com');
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('**/dashboard.html');
  await expect(page).toHaveURL(/dashboard\.html/);
});

