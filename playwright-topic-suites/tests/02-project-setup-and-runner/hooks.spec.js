import { test, expect } from '@playwright/test';

test.describe('hooks example', () => {
  test.beforeAll(async () => {});

  test.beforeEach(async ({ page }) => {
    await page.goto('/login.html');
  });

  test.afterEach(async () => {});
  test.afterAll(async () => {});

  test('beforeEach keeps repeated setup in one place', async ({ page }) => {
    await expect(page.getByLabel('Email')).toBeVisible();
  });
});

