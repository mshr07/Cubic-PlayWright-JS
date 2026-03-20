import { test, expect } from '@playwright/test';

test('popup windows: wait for the popup page', async ({ page }) => {
  await page.goto('/popup-source.html');
  const popupPromise = page.waitForEvent('popup');
  await page.locator('#open-popup').click();
  const popup = await popupPromise;
  await expect(popup.getByText('Popup Ready')).toBeVisible();
});

