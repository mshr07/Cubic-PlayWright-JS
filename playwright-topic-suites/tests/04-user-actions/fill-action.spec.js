import { test, expect } from '@playwright/test';

test('fill(): replace the current value in an input', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await page.getByLabel('Full name').fill('Playwright Learner');
  await expect(page.getByLabel('Full name')).toHaveValue('Playwright Learner');
});

