// Topic: CommonJS basics
// Why it matters:
// Older Node.js projects still use module.exports and require().

const mathHelpers = require('./commonjs-helpers.cjs');

console.log(mathHelpers.add(2, 3));

