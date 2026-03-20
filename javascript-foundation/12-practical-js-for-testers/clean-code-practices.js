// Topic: clean code practices for test automation

export function buildLoginPayload(email, password) {
  return {
    email: email.trim().toLowerCase(),
    password
  };
}

export function summarizeResult(testName, status) {
  return `${testName}: ${status}`;
}

