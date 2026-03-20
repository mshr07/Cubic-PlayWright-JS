import { test, expect } from '@playwright/test';

test('handling multiple tabs/pages: create and manage more than one page', async ({ context }) => {
  const firstPage = await context.newPage();
  const secondPage = await context.newPage();
  await firstPage.goto('/login.html');
  await secondPage.goto('/dashboard.html');
  await expect(secondPage.getByText('Run smoke suite')).toBeVisible();
});

