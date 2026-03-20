// Topic: reusable helper functions and validation helpers

export function formatCurrency(amount) {
  return `₹${amount.toFixed(2)}`;
}

export function isValidEmail(email) {
  return typeof email === 'string' && email.includes('@') && email.includes('.');
}

export function ensureValue(value, message) {
  if (!value) {
    throw new Error(message);
  }
}

