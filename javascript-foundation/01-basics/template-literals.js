// Topic: template literals
// Why it matters for Playwright:
// They make logs, dynamic locators, and error messages much easier to read.

const suiteName = 'Smoke';
const passedCount = 12;

console.log(`Suite "${suiteName}" completed with ${passedCount} passing checks.`);

