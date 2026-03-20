// Debugging method reference
// These methods help pause, observe, and capture extra artifacts.

import { test } from '@playwright/test';

// ==============================
// METHOD: page.pause()
// ==============================
// Description:
// Pauses test execution and opens Playwright Inspector.
//
// Why:
// Very useful while debugging locators and flow timing.
//
// When to use:
// Local debugging only.
//
// Example:
export async function pagePauseExample(page) {
  await page.goto('http://127.0.0.1:3000/login.html');
  await page.pause();
}

// ==============================
// METHOD: test.step()
// ==============================
// Description:
// Wraps actions in a named reporting step.
//
// Why:
// Makes reports and debugging output easier to read.
//
// Example:
export async function testStepExample(page) {
  await test.step('Open dashboard page', async () => {
    await page.goto('http://127.0.0.1:3000/dashboard.html');
  });
}

// ==============================
// METHOD: page.screenshot()
// ==============================
// Description:
// Captures the page state as an image.
//
// Why:
// Very useful for debugging failed states.
//
// Example:
export async function debuggingScreenshotExample(page) {
  await page.goto('http://127.0.0.1:3000/dashboard.html');
  await page.screenshot({ path: 'playwright-api-reference/debugging/dashboard-debug.png' });
}

// ==============================
// METHOD: tracing.start()
// ==============================
// Description:
// Starts Playwright tracing for a browser context.
//
// Why:
// Trace files help diagnose timing, network, console, and action sequences.
//
// When to use:
// Use for targeted debugging or framework-level diagnostics.
//
// Example:
export async function tracingStartExample(context) {
  await context.tracing.start({ screenshots: true, snapshots: true });
}

// ==============================
// METHOD: tracing.stop()
// ==============================
// Description:
// Stops tracing and writes the trace to a file.
//
// Why:
// Creates a trace artifact viewable in Trace Viewer.
//
// Example:
export async function tracingStopExample(context) {
  await context.tracing.stop({ path: 'playwright-api-reference/debugging/trace-example.zip' });
}

