import { test, expect } from '@playwright/test';

[
  { email: 'student1@example.com', password: 'Password123' },
  { email: 'student1@example.com', password: 'WrongPassword' }
].forEach(({ email, password }) => {
  test(`parameterized style tests: login attempt for ${password}`, async ({ page }) => {
    await page.goto('/login.html');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    if (password === 'Password123') {
      await expect(page).toHaveURL(/dashboard\.html/);
    } else {
      await expect(page.locator('#login-message')).toHaveText('Invalid credentials');
    }
  });
});
