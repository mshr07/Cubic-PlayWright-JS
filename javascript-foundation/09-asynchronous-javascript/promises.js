// Topic: synchronous vs asynchronous code, promises, and promise chaining
// Why async matters for Playwright:
// Almost every browser action returns a promise and must be awaited.

console.log('1. Start');

function fakeApiCall() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ status: 'passed' }), 100);
  });
}

fakeApiCall()
  .then((result) => {
    console.log('2. Promise resolved', result);
    return '3. Promise chaining works';
  })
  .then((message) => console.log(message));

console.log('This log appears before the promise resolves');

