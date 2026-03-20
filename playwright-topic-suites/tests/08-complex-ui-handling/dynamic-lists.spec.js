import { test, expect } from '@playwright/test';

test('dynamic lists: validate repeated UI collections', async ({ page }) => {
  await page.goto('/locator-playground.html');
  await expect(page.locator('#dynamic-list .topic-item')).toHaveCount(3);
});

