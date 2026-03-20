// Topic: simple logger utility
// Why it matters:
// Clean logs make debugging failed automation much easier.

export function logInfo(message) {
  console.log(`[INFO] ${message}`);
}

export function logError(message) {
  console.error(`[ERROR] ${message}`);
}

