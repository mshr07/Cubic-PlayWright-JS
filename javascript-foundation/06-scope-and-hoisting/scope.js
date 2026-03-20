// Topic: global, function, block, and lexical scope
// Why it matters for Playwright:
// Variable scope mistakes often create flaky helpers and confusing test failures.

const globalMessage = 'Visible everywhere in this file';

function explainScope() {
  const functionMessage = 'Only inside the function';

  if (true) {
    const blockMessage = 'Only inside this block';
    console.log(globalMessage);
    console.log(functionMessage);
    console.log(blockMessage);
  }
}

explainScope();

