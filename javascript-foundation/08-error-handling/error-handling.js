// Topic: try, catch, finally, throw, custom errors, and defensive coding
// Why it matters for Playwright:
// Automation code must fail clearly when data or state is invalid.

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function getEmailDomain(email) {
  if (!email || !email.includes('@')) {
    throw new ValidationError('Email must contain @');
  }

  return email.split('@')[1];
}

try {
  console.log(getEmailDomain('tester@example.com'));
  console.log(getEmailDomain('broken-email'));
} catch (error) {
  console.error(`${error.name}: ${error.message}`);
} finally {
  console.log('Validation attempt completed');
}

