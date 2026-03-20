import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

test('simple page object: wrap a page in a small class', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await expect(loginPage.signInButton).toBeVisible();
});

