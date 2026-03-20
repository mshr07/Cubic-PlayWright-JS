import { test, expect } from '@playwright/test';

test('browser vs context vs page: contexts isolate state', async ({ browser }) => {
  const contextOne = await browser.newContext();
  const contextTwo = await browser.newContext();
  const pageOne = await contextOne.newPage();
  const pageTwo = await contextTwo.newPage();

  await pageOne.goto('/login.html');
  await pageOne.evaluate(() => localStorage.setItem('token', 'one'));
  await pageTwo.goto('/login.html');

  await expect(pageTwo.evaluate(() => localStorage.getItem('token'))).resolves.toBeNull();

  await contextOne.close();
  await contextTwo.close();
});

