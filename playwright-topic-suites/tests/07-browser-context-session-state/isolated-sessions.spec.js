import { test, expect } from '@playwright/test';

test('isolated sessions: local storage does not leak between contexts', async ({ browser }) => {
  const one = await browser.newContext();
  const two = await browser.newContext();
  const pageOne = await one.newPage();
  const pageTwo = await two.newPage();

  await pageOne.goto('/login.html');
  await pageOne.evaluate(() => localStorage.setItem('course', 'playwright'));
  await pageTwo.goto('/login.html');

  await expect(pageTwo.evaluate(() => localStorage.getItem('course'))).resolves.toBeNull();
  await one.close();
  await two.close();
});

