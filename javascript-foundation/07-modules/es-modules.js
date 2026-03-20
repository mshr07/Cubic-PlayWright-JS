// Topic: ES modules with export, default export, named export, import, and aliasing

import normalizeTag, { buildSuiteTitle as createSuiteTitle } from './es-module-helpers.js';

console.log(createSuiteTitle('Regression'));
console.log(normalizeTag('  @SMOKE '));

