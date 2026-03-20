export async function pollUntil(asyncAction, isDone, maxAttempts = 5) {
  let attempt = 0;

  while (attempt < maxAttempts) {
    attempt += 1;
    const result = await asyncAction();

    if (isDone(result)) {
      return result;
    }
  }

  throw new Error('Condition was not met within the allowed attempts');
}

