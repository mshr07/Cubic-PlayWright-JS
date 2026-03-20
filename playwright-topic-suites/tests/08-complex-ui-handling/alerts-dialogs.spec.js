import { test, expect } from '@playwright/test';

test('alerts and dialogs: accept or dismiss browser dialogs', async ({ page }) => {
  await page.goto('/locator-playground.html');
  page.on('dialog', async (dialog) => dialog.accept('Playwright'));
  await page.getByRole('button', { name: 'Show prompt' }).click();
  await expect(page.getByRole('button', { name: 'Show prompt' })).toBeVisible();
});
