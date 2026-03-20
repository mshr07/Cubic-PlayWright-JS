import { test, expect } from '@playwright/test';

test('multiple contexts: two users can be simulated in one test', async ({ browser }) => {
  const userOneContext = await browser.newContext();
  const userTwoContext = await browser.newContext();
  const userOnePage = await userOneContext.newPage();
  const userTwoPage = await userTwoContext.newPage();

  await userOnePage.goto('/dashboard.html');
  await userTwoPage.goto('/dashboard.html');
  await expect(userOnePage.getByText('Review test report')).toBeVisible();
  await expect(userTwoPage.getByText('Run smoke suite')).toBeVisible();

  await userOneContext.close();
  await userTwoContext.close();
});

