import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

test('separating locators from tests keeps specs focused on behavior', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await expect(loginPage.emailInput).toBeVisible();
});

