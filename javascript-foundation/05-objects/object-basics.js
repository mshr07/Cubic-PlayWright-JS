// Topic: object creation, property access, nested objects, and methods
// Why it matters for Playwright:
// Test data and page object models are heavily object-based.

const testUser = {
  profile: {
    firstName: 'Asha',
    role: 'tester'
  },
  getDisplayName() {
    return `${this.profile.firstName} (${this.profile.role})`;
  }
};

console.log(testUser.profile.firstName);
console.log(testUser['profile'].role);
console.log(testUser.getDisplayName());

