// Topic: hoisting and var vs let vs const
// Common mistake:
// Assuming let and const behave like var. They do not.

console.log(hoistedValue);
var hoistedValue = 'var is hoisted with undefined';

printMessage();

function printMessage() {
  console.log('Function declarations are hoisted');
}

// Uncommenting the next line throws because let is in the temporal dead zone.
// console.log(notReadyYet);
const notReadyYet = 'let and const are block scoped and not safely usable before declaration';

console.log(notReadyYet);
