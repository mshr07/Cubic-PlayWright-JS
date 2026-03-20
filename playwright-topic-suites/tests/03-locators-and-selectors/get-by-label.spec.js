import { test, expect } from '@playwright/test';

test('getByLabel(): excellent for forms', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await page.getByLabel('Full name').fill('Learner One');
  await expect(page.getByLabel('Full name')).toHaveValue('Learner One');
});

