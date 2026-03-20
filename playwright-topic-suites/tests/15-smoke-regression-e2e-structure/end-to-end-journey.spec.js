import { test, expect } from '@playwright/test';

test('@e2e end-to-end journey: login and land on dashboard', async ({ page }) => {
  await page.goto('/login.html');
  await page.getByLabel('Email').fill('student1@example.com');
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/dashboard\.html/);
  await expect(page.getByText('Review test report')).toBeVisible();
});

