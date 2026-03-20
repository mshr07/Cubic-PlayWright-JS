// Topic: loops
// Why it matters for Playwright:
// Data-driven tests often loop through datasets, rows, and repeated checks.

const browsers = ['chromium', 'firefox', 'webkit'];

for (let index = 0; index < browsers.length; index += 1) {
  console.log(`for loop -> ${browsers[index]}`);
}

let count = 0;
while (count < 2) {
  console.log(`while loop -> retry ${count + 1}`);
  count += 1;
}

for (const browser of browsers) {
  if (browser === 'firefox') {
    continue;
  }

  console.log(`for...of -> ${browser}`);

  if (browser === 'webkit') {
    break;
  }
}

