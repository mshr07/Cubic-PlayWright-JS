import { test, expect } from '@playwright/test';

test('local storage usage: persist values for a context', async ({ page }) => {
  await page.goto('/login.html');
  await page.evaluate(() => localStorage.setItem('training-mode', 'enabled'));
  await expect(page.evaluate(() => localStorage.getItem('training-mode'))).resolves.toBe('enabled');
});

