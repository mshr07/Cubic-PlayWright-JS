// Routing method reference
// These methods let tests intercept, modify, mock, or block browser requests.

// ==============================
// METHOD: page.route()
// ==============================
// Description:
// Registers a route handler for matching network requests.
//
// Why:
// It is the entry point for request interception and mocking.
//
// Example:
export async function pageRouteExample(page) {
  await page.route('**/api/products', async (route) => {
    await route.continue();
  });
}

// ==============================
// METHOD: route.continue()
// ==============================
// Description:
// Continues the intercepted request, optionally with modifications.
//
// Why:
// Useful when you want to observe or tweak an outgoing request.
//
// Example:
export async function routeContinueExample(page) {
  await page.route('**/api/products?search=mouse', async (route) => {
    const updatedUrl = route.request().url().replace('mouse', 'keyboard');
    await route.continue({ url: updatedUrl });
  });
}

// ==============================
// METHOD: route.fulfill()
// ==============================
// Description:
// Returns a mocked response instead of hitting the real backend.
//
// Why:
// Useful for stable frontend tests and rare backend scenarios.
//
// Example:
export async function routeFulfillExample(page) {
  await page.route('**/api/products', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [{ id: 999, name: 'Mocked product' }] })
    });
  });
}

// ==============================
// METHOD: route.abort()
// ==============================
// Description:
// Blocks the intercepted request.
//
// Why:
// Useful for negative testing, offline simulation, or blocking third-party assets.
//
// Example:
export async function routeAbortExample(page) {
  await page.route('**/api/products', async (route) => {
    await route.abort();
  });
}

