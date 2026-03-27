import { test, expect } from '@playwright/test';

test('reusing authenticated state: create a new context from stored state', async ({ browser, page, context }) => {
  const statePath = new URL('../../reports/reused-auth-state.json', import.meta.url).pathname;
  await page.goto('/login.html');
  await page.getByLabel('Email').fill('student1@example.com');
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await context.storageState({ path: statePath });

  const restoredContext = await browser.newContext({ storageState: statePath });
  const restoredPage = await restoredContext.newPage();
  await restoredPage.goto('/dashboard.html');
  await expect(restoredPage.getByText('Welcome to the SDET dashboard')).toBeVisible();
  await restoredContext.close();
});

