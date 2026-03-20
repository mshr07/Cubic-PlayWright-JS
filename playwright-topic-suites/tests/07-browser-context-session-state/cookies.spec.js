import { test, expect } from '@playwright/test';

test('cookies: add and inspect cookies through browser context', async ({ context, page }) => {
  await context.addCookies([
    {
      name: 'training-cookie',
      value: 'cookie-value',
      url: 'http://127.0.0.1:3000'
    }
  ]);
  await page.goto('/');
  const cookies = await context.cookies();
  expect(cookies.some((cookie) => cookie.name === 'training-cookie')).toBeTruthy();
});

