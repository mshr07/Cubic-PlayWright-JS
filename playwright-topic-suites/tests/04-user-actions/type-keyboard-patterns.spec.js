import { test, expect } from '@playwright/test';

test('keyboard input patterns: use pressSequentially and keyboard helpers', async ({ page }) => {
  await page.goto('/locator-playground.html');
  const input = page.getByLabel('Full name');
  await input.click();
  await input.pressSequentially('Typed slowly');
  await page.keyboard.press('End');
  await expect(input).toHaveValue('Typed slowly');
});

