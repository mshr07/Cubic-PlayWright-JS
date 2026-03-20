// Useful extra Playwright method reference
// These are common but often under-taught helper methods.

import { expect } from '@playwright/test';

// ==============================
// METHOD: page.evaluate()
// ==============================
// Description:
// Runs JavaScript in the browser page context.
//
// Why:
// Useful for reading local storage, DOM values, or app state directly.
//
// Common mistake:
// Overusing evaluate when a normal locator or assertion would be clearer.
//
// Example:
export async function pageEvaluateExample(page) {
  await page.goto('http://127.0.0.1:3000/login.html');
  return page.evaluate(() => window.location.pathname);
}

// ==============================
// METHOD: locator.count()
// ==============================
// Description:
// Returns the number of matched elements.
//
// Why:
// Useful for repeated list items or table rows.
//
// Example:
export async function locatorCountExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  return page.locator('.topic-item').count();
}

// ==============================
// METHOD: locator.allTextContents()
// ==============================
// Description:
// Returns text content from all matched elements.
//
// Why:
// Useful for quick list comparisons.
//
// Example:
export async function locatorAllTextContentsExample(page) {
  await page.goto('http://127.0.0.1:3000/dashboard.html');
  return page.locator('#task-list li').allTextContents();
}

// ==============================
// METHOD: locator.isVisible()
// ==============================
// Description:
// Returns whether the element is visible at the moment.
//
// Why:
// Useful in helper functions when you need a boolean instead of an assertion.
//
// Common mistake:
// Using it instead of `expect(locator).toBeVisible()` for standard assertions.
//
// Example:
export async function locatorIsVisibleExample(page) {
  await page.goto('http://127.0.0.1:3000/dashboard.html');
  return page.getByText('Log defect').isVisible();
}

// ==============================
// METHOD: expect.poll()
// ==============================
// Description:
// Repeatedly polls a function until the expectation passes.
//
// Why:
// Great for eventual consistency and async backend states.
//
// Example:
export async function expectPollExample(page) {
  await page.goto('http://127.0.0.1:3000/');
  await expect.poll(async () => page.title()).toContain('Playwright Training App');
}

