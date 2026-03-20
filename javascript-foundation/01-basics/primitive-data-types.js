// Topic: primitive data types
// Why it matters for Playwright:
// Assertions compare strings, numbers, booleans, nulls, and undefined values all the time.

const userName = 'Hemanth';
const retryCount = 2;
const isLoggedIn = false;
const selectedProject = null;
let optionalMessage;

console.log(typeof userName, userName);
console.log(typeof retryCount, retryCount);
console.log(typeof isLoggedIn, isLoggedIn);
console.log(selectedProject === null, selectedProject);
console.log(optionalMessage === undefined, optionalMessage);

