// Topic: arrow functions
// Why it matters for Playwright:
// Widely used in Playwright tests, callbacks, maps, filters, and fixtures.

const normalizeEmail = (email = '') => email.trim().toLowerCase();

console.log(normalizeEmail('  Tester@Example.com  '));

