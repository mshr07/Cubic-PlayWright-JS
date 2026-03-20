// Topic: map, filter, find, reduce, some, every, and array destructuring
// Why it matters for Playwright:
// These are everyday tools when shaping test data and assertion summaries.

const testRuns = [
  { id: 1, status: 'passed', duration: 2 },
  { id: 2, status: 'failed', duration: 5 },
  { id: 3, status: 'passed', duration: 3 }
];

const statuses = testRuns.map((run) => run.status);
const failedRuns = testRuns.filter((run) => run.status === 'failed');
const longRun = testRuns.find((run) => run.duration > 4);
const totalDuration = testRuns.reduce((sum, run) => sum + run.duration, 0);
const hasFailure = testRuns.some((run) => run.status === 'failed');
const allShort = testRuns.every((run) => run.duration < 10);
const [firstRun] = testRuns;

console.log({ statuses, failedRuns, longRun, totalDuration, hasFailure, allShort, firstRun });

