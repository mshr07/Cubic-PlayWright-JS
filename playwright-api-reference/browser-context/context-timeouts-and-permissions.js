// Context timeout and permission methods reference
// These methods shape how long Playwright waits and what the browser is allowed to do.

// ==============================
// METHOD: context.grantPermissions()
// ==============================
// Description:
// Grants browser permissions such as geolocation, clipboard, or notifications.
//
// Why:
// Some applications request browser permissions and tests must allow them.
//
// When to use:
// Use before visiting a page that needs a browser-level permission.
//
// Common mistake:
// Granting permissions after the page already requested them.
//
// Example:
export async function contextGrantPermissionsExample(context, page) {
  await context.grantPermissions(['clipboard-read']);
  await page.goto('http://127.0.0.1:3000/');
}

// ==============================
// METHOD: context.setDefaultTimeout()
// ==============================
// Description:
// Sets the default timeout for most actions in the context.
//
// Why:
// Helps standardize waiting behavior for slower environments.
//
// When to use:
// Use in setup when all pages in a context need a custom action timeout.
//
// Common mistake:
// Setting very large global timeouts and hiding slow or flaky behavior.
//
// Example:
export async function contextSetDefaultTimeoutExample(context) {
  context.setDefaultTimeout(10_000);
}

// ==============================
// METHOD: context.setDefaultNavigationTimeout()
// ==============================
// Description:
// Sets the default timeout for navigation-related operations.
//
// Why:
// Navigation often needs separate tuning from normal action timeouts.
//
// When to use:
// Use when the app has slow navigations but normal UI interactions.
//
// Example:
export async function contextSetDefaultNavigationTimeoutExample(context) {
  context.setDefaultNavigationTimeout(15_000);
}

