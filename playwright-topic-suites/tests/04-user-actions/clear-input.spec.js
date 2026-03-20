import { test, expect } from '@playwright/test';

test('clear(): remove input text cleanly', async ({ page }) => {
  await page.goto('/locator-playground.html');
  const input = page.getByLabel('Full name');
  await input.fill('Temporary text');
  await input.clear();
  await expect(input).toHaveValue('');
});

