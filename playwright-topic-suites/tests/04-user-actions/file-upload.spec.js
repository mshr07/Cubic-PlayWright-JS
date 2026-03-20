import { test, expect } from '@playwright/test';
import { fileURLToPath } from 'url';

test('file upload: set input files for upload controls', async ({ page }) => {
  await page.goto('/locator-playground.html');
  const filePath = fileURLToPath(new URL('../../local-app/public/files/sample-upload.txt', import.meta.url));
  await page.locator('#file-input').setInputFiles(filePath);
  const files = await page.locator('#file-input').evaluate((input) => input.files.length);
  expect(files).toBe(1);
});
