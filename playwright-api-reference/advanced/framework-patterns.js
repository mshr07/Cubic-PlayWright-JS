// Advanced Playwright patterns reference
// These examples focus on framework design and less obvious testing patterns.

// ==============================
// TOPIC: handling multiple contexts
// ==============================
// Description:
// Use more than one browser context when simulating separate users.
//
// Why:
// Contexts isolate cookies, storage, and session state.
//
// When to use:
// Use for admin-vs-user flows, chat apps, approvals, or multi-tenant checks.
//
// Example:
export async function multipleContextsExample(browser) {
  const adminContext = await browser.newContext();
  const userContext = await browser.newContext();
  const adminPage = await adminContext.newPage();
  const userPage = await userContext.newPage();

  await adminPage.goto('http://127.0.0.1:3000/dashboard.html');
  await userPage.goto('http://127.0.0.1:3000/login.html');

  await adminContext.close();
  await userContext.close();
}

// ==============================
// TOPIC: parallel execution concepts
// ==============================
// Description:
// Playwright can run independent tests in parallel workers.
//
// Why:
// Parallelism reduces total suite time.
//
// When to use:
// Use for independent tests that do not share mutable external state.
//
// Common mistake:
// Running stateful tests in parallel without isolation.
//
// Example:
export const parallelExecutionConcept = `
test.describe.configure({ mode: 'parallel' });
`;

// ==============================
// TOPIC: retry logic
// ==============================
// Description:
// Retries rerun failed tests automatically when configured.
//
// Why:
// Useful for handling occasional environmental instability while still preserving evidence.
//
// When to use:
// Keep retries low and use them to surface flakiness, not hide it.
//
// Example:
export const retryConfigExample = `
export default defineConfig({
  retries: process.env.CI ? 1 : 0
});
`;

// ==============================
// TOPIC: fixtures basics
// ==============================
// Description:
// Fixtures provide reusable setup data or prepared objects to tests.
//
// Why:
// They reduce repetition and improve readability.
//
// When to use:
// Use for auth setup, shared users, API clients, or common pages.
//
// Example:
export const fixtureBasicsExample = `
import { test as base } from '@playwright/test';

export const test = base.extend({
  sampleUser: async ({}, use) => {
    await use({ email: 'student1@example.com', password: 'Password123' });
  }
});
`;

// ==============================
// TOPIC: environment config usage
// ==============================
// Description:
// Read base URLs, ports, and runtime switches from environment variables.
//
// Why:
// This makes suites portable across local, QA, and CI environments.
//
// Common mistake:
// Hardcoding URLs all over tests instead of centralizing config.
//
// Example:
export function environmentConfigUsageExample() {
  return {
    uiBaseUrl: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000',
    apiBaseUrl: process.env.API_TESTING_BASE_URL || 'http://127.0.0.1:3100'
  };
}

