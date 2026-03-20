// Test runner method reference
// These examples show how Playwright Test structures test suites.

import { test, expect } from '@playwright/test';

// ==============================
// METHOD: test()
// ==============================
// Description:
// Declares a single test case.
//
// Why:
// It is the fundamental unit of Playwright Test.
//
// Example:
export function registerTestExample() {
  test('basic test example', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/');
    await expect(page.getByText('Playwright Training App')).toBeVisible();
  });
}

// ==============================
// METHOD: test.describe()
// ==============================
// Description:
// Groups related tests together.
//
// Why:
// Helps organize suites by feature or topic.
//
// Example:
export function registerDescribeExample() {
  test.describe('login feature', () => {
    test('login page loads', async ({ page }) => {
      await page.goto('http://127.0.0.1:3000/login.html');
      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });
  });
}

// ==============================
// METHOD: test.beforeEach()
// ==============================
// Description:
// Runs before each test in the current scope.
//
// Why:
// Useful for repeated setup.
//
// Example:
export function registerBeforeEachExample() {
  test.describe('shared setup', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://127.0.0.1:3000/login.html');
    });

    test('email field is visible', async ({ page }) => {
      await expect(page.getByLabel('Email')).toBeVisible();
    });
  });
}

// ==============================
// METHOD: test.afterEach()
// ==============================
// Description:
// Runs after each test in the current scope.
//
// Why:
// Useful for cleanup or diagnostics.
//
// Example:
export function registerAfterEachExample() {
  test.describe('cleanup example', () => {
    test.afterEach(async ({ page }) => {
      await page.close();
    });
  });
}

// ==============================
// METHOD: test.beforeAll()
// ==============================
// Description:
// Runs once before all tests in a scope.
//
// Why:
// Useful for expensive setup that should not repeat for every test.
//
// Example:
export function registerBeforeAllExample() {
  test.describe('before all example', () => {
    test.beforeAll(async () => {});
  });
}

// ==============================
// METHOD: test.afterAll()
// ==============================
// Description:
// Runs once after all tests in a scope.
//
// Why:
// Useful for final cleanup and summary work.
//
// Example:
export function registerAfterAllExample() {
  test.describe('after all example', () => {
    test.afterAll(async () => {});
  });
}

// ==============================
// METHOD: test.skip()
// ==============================
// Description:
// Skips a test or suite.
//
// Why:
// Useful for unsupported environments or temporary blockers.
//
// Common mistake:
// Leaving skipped tests in the suite without tracking why.
//
// Example:
export function registerSkipExample() {
  test.skip('temporary skip example', async () => {});
}

// ==============================
// METHOD: test.only()
// ==============================
// Description:
// Runs only this test or suite.
//
// Why:
// Useful during local debugging.
//
// Common mistake:
// Accidentally committing `only` to source control.
//
// Example:
export function registerOnlyExample() {
  test.only('local focus example', async () => {});
}

// ==============================
// METHOD: test.fixme()
// ==============================
// Description:
// Marks a test as expected to be broken and prevents execution.
//
// Why:
// Better than a silent skip when a known issue exists.
//
// Example:
export function registerFixmeExample() {
  test.fixme('known broken flow example', async () => {});
}

