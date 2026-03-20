import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

test('reusable page actions: call page methods instead of repeating steps', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('student1@example.com', 'Password123');
  await expect(page).toHaveURL(/dashboard\.html/);
});

