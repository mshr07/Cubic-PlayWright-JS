export function getTodayAsInputValue() {
  return new Date().toISOString().split('T')[0];
}

