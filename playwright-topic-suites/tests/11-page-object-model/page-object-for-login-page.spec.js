import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

test('page object for login page models login-specific behavior', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('student1@example.com', 'WrongPassword');
  await expect(loginPage.message).toHaveText('Invalid credentials');
});

