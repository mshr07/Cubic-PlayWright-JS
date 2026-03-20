import { test, expect } from '@playwright/test';

test('dragAndDrop(): simulate HTML5 drag and drop', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await page.dragAndDrop('#drag-source', '#drop-target');
  await expect(page.locator('#drop-target')).toHaveText('Dropped successfully');
});

