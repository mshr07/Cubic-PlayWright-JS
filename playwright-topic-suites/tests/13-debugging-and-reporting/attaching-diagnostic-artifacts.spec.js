import { test, expect } from '@playwright/test';

test('attaching diagnostic artifacts: add custom debugging info to reports', async ({ page }, testInfo) => {
  await page.goto('/dashboard.html');
  await testInfo.attach('dashboard-html', {
    body: await page.content(),
    contentType: 'text/html'
  });
  await expect(page.getByText('Review test report')).toBeVisible();
});

