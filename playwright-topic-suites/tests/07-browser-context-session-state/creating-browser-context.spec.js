import { test, expect } from '@playwright/test';

test('creating browser context: create isolated browser state', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('/');
  await expect(page).toHaveTitle('Playwright Training App');
  await context.close();
});

