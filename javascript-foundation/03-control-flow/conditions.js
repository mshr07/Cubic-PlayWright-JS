// Topic: if, else if, else, switch, and ternary
// Why it matters for Playwright:
// Tests choose different behavior based on environment, user role, or app state.

const statusCode = 200;

if (statusCode >= 500) {
  console.log('Server error');
} else if (statusCode >= 400) {
  console.log('Client error');
} else {
  console.log('Request successful');
}

const environment = 'qa';
switch (environment) {
  case 'qa':
    console.log('Run against QA environment');
    break;
  case 'prod':
    console.log('Use extra caution in production');
    break;
  default:
    console.log('Unknown environment');
}

const badge = statusCode === 200 ? 'green' : 'red';
console.log(`Status badge should be ${badge}`);

