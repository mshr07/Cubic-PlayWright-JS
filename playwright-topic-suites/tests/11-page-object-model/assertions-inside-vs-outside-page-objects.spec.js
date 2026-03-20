import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

test('assertions usually stay outside page objects for clearer test intent', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('student1@example.com', 'Password123');
  await expect(page).toHaveURL(/dashboard\.html/);
});

