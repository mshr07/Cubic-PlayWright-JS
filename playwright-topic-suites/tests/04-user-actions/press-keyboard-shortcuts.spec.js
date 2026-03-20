import { test, expect } from '@playwright/test';

test('press(): use keyboard shortcuts', async ({ page }) => {
  await page.goto('/locator-playground.html');
  const input = page.getByLabel('Notes');
  await input.fill('Line one');
  await input.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
  await input.press('Backspace');
  await expect(input).toHaveValue('');
});
