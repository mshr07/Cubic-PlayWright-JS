import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

test('browser launch basics: create and close a browser manually', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:3000/');
  await expect(page).toHaveTitle('Playwright Training App');
  await browser.close();
});

