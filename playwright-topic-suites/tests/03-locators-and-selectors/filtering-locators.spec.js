import { test, expect } from '@playwright/test';

test('filtering locators: select one item from many similar matches', async ({ page }) => {
  await page.goto('/locator-playground.html');
  const fixturesItem = page.locator('.topic-item').filter({ hasText: 'Fixtures' });
  await expect(fixturesItem).toHaveText('Fixtures');
});

