import { test, expect } from '@playwright/test';

test('handling iframes: use frameLocator for stable access', async ({ page }) => {
  await page.goto('/iframe-host.html');
  const frame = page.frameLocator('iframe[title="training-frame"]');
  await expect(frame.locator('#frame-button')).toHaveText('Frame button');
});

