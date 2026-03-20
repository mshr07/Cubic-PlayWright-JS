import { test, expect } from '@playwright/test';
import fs from 'fs';

const credentials = JSON.parse(
  fs.readFileSync(new URL('../../test-data/login-users.json', import.meta.url), 'utf-8')
);

test('separating test data from test logic keeps tests cleaner', async ({ page }) => {
  await page.goto('/login.html');
  await page.getByLabel('Email').fill(credentials.validUser.email);
  await page.getByLabel('Password').fill(credentials.validUser.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/dashboard\.html/);
});

