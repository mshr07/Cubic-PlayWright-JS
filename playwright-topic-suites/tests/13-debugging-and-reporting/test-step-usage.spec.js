import { test, expect } from '@playwright/test';

test('test.step usage: create readable debug checkpoints', async ({ page }) => {
  await test.step('Open login page', async () => {
    await page.goto('/login.html');
  });

  await test.step('Validate key controls', async () => {
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });
});

