// Topic: function expressions
// Why it matters for Playwright:
// Helpful when passing behavior into helpers or composing utilities.

const calculateTotalChecks = function (uiChecks, apiChecks) {
  return uiChecks + apiChecks;
};

console.log(calculateTotalChecks(5, 3));

