import { test, expect } from '@playwright/test';

test('console logging: capture browser console output for debugging', async ({ page }) => {
  const messages = [];
  page.on('console', (message) => messages.push(message.text()));
  await page.goto('/login.html');
  await page.evaluate(() => console.log('login page loaded'));
  expect(messages).toContain('login page loaded');
});

