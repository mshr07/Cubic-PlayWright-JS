// Topic: variables with var, let, and const
// Why it matters for Playwright:
// Test code stores URLs, selectors, user data, and expected values in variables.
// Common mistake:
// Reassigning a value that should stay constant, or using var when block scope is needed.

var oldStyleName = 'legacy var';
let testCaseName = 'Login should succeed';
const baseUrl = 'http://127.0.0.1:3000';

testCaseName = 'Login should show dashboard';

console.log({ oldStyleName, testCaseName, baseUrl });

