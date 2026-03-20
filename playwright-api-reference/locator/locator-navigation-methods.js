// Locator navigation method reference
// These methods refine or navigate among repeated matches.

// ==============================
// METHOD: locator.first()
// ==============================
// Description:
// Returns the first matching locator.
//
// Why:
// Useful when a repeated list is expected and the first item matters.
//
// Example:
export async function locatorFirstExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  return page.locator('.topic-item').first();
}

// ==============================
// METHOD: locator.last()
// ==============================
// Description:
// Returns the last matching locator.
//
// Why:
// Useful when new items append to the end of a list.
//
// Example:
export async function locatorLastExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  return page.locator('.topic-item').last();
}

// ==============================
// METHOD: locator.nth()
// ==============================
// Description:
// Returns the locator at a specific zero-based position.
//
// Why:
// Useful for repeated rows or cards when order is meaningful.
//
// Common mistake:
// Relying on index when order is unstable.
//
// Example:
export async function locatorNthExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  return page.locator('.topic-item').nth(1);
}

// ==============================
// METHOD: locator.filter()
// ==============================
// Description:
// Narrows a locator by text or nested content.
//
// Why:
// Helps target one item from many similar matches.
//
// Example:
export async function locatorFilterExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  return page.locator('.topic-item').filter({ hasText: 'Fixtures' });
}

// ==============================
// METHOD: locator.locator()
// ==============================
// Description:
// Creates a child locator relative to another locator.
//
// Why:
// Useful for targeting nested elements safely.
//
// Example:
export async function locatorLocatorExample(page) {
  await page.goto('http://127.0.0.1:3000/locator-playground.html');
  return page.locator('table').locator('tbody tr').first().locator('td').last();
}

