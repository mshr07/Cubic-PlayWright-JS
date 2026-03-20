import { test, expect } from '@playwright/test';

test('lazy content: validate newly loaded content', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await page.locator('#load-more').click();
  await expect(page.locator('#lazy-content')).toContainText('Lazy item 1');
});
