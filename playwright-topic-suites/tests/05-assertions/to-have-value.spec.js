import { test, expect } from '@playwright/test';

test('toHaveValue(): confirm field value', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await page.getByLabel('Full name').fill('QA Student');
  await expect(page.getByLabel('Full name')).toHaveValue('QA Student');
});

