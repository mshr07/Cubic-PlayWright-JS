// Topic: function declarations
// Why it matters for Playwright:
// Reusable actions like login or navigation often start as small functions.

function buildWelcomeMessage(userName) {
  return `Welcome, ${userName}`;
}

console.log(buildWelcomeMessage('Freshers'));

