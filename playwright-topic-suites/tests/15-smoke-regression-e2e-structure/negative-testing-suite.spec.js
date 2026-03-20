import { test, expect } from '@playwright/test';

test('@negative negative testing suite: invalid login should fail safely', async ({ page }) => {
  await page.goto('/login.html');
  await page.getByLabel('Email').fill('student1@example.com');
  await page.getByLabel('Password').fill('WrongPassword');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('#login-message')).toHaveText('Invalid credentials');
});

