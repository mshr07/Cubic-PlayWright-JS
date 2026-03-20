// Topic: JSON.parse, JSON.stringify, and handling API-style objects
// Why it matters for Playwright:
// API tests and data-driven UI tests use JSON constantly.

const rawUser = '{"id":1,"name":"Learner","roles":["tester","api"]}';
const parsedUser = JSON.parse(rawUser);

console.log(parsedUser.roles[0]);

const requestBody = {
  title: 'Create bug report',
  completed: false
};

console.log(JSON.stringify(requestBody, null, 2));

