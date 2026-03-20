// Topic: array creation, indexing, and common mutation methods

const suites = ['smoke', 'regression'];

suites.push('api');
suites.unshift('sanity');
console.log(suites[0]);
console.log(suites.pop());
console.log(suites.shift());
console.log(suites);

