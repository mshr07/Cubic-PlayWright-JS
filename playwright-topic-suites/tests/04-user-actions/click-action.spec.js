import { test, expect } from '@playwright/test';

test('click(): trigger a standard button action', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await page.getByRole('button', { name: 'Save changes' }).click();
  await expect(page).toHaveTitle('Save clicked');
});

