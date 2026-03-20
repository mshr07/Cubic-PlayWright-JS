import { test, expect } from '@playwright/test';

test('mouse actions: click using mouse helpers', async ({ page }) => {
  await page.goto('/locator-playground.html');
  const box = await page.locator('#primary-action').boundingBox();
  await page.mouse.click(box.x + 5, box.y + 5);
  await expect(page).toHaveTitle('Save clicked');
});

