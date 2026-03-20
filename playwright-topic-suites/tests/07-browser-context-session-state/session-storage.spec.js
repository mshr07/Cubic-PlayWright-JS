import { test, expect } from '@playwright/test';

test('session storage: values live only for the current tab session', async ({ page }) => {
  await page.goto('/login.html');
  await page.evaluate(() => sessionStorage.setItem('session-key', 'temp'));
  await expect(page.evaluate(() => sessionStorage.getItem('session-key'))).resolves.toBe('temp');
});

