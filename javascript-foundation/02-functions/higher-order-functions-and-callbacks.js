// Topic: higher-order functions and callback basics
// Why it matters for Playwright:
// Many test utilities accept functions, and array methods rely on callbacks.

function runWithLogger(taskName, callback) {
  console.log(`Starting task: ${taskName}`);
  const result = callback();
  console.log(`Finished task: ${taskName}`);
  return result;
}

const status = runWithLogger('validate dashboard', () => 'passed');
console.log(status);

