// Topic: async/await and async error handling
// Event loop note:
// JavaScript can schedule async work and continue running other tasks while waiting.

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runAsyncDemo() {
  try {
    console.log('Before wait');
    await wait(100);
    console.log('After wait');
  } catch (error) {
    console.error('Async failure', error.message);
  }
}

await runAsyncDemo();

