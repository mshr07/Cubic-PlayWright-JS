import { formatCurrency, isValidEmail, ensureValue } from './helpers.js';
import { logInfo } from './logger.js';
import { environmentConfig } from './environment-config.js';
import { buildLoginPayload, summarizeResult } from './clean-code-practices.js';

logInfo(`Base URL -> ${environmentConfig.baseUrl}`);
logInfo(`Default browser -> ${environmentConfig.browser}`);
logInfo(`Formatted amount -> ${formatCurrency(499.5)}`);
logInfo(`Email valid -> ${isValidEmail('freshers@example.com')}`);

const payload = buildLoginPayload('  User@Example.com ', 'Password123');
ensureValue(payload.email, 'Email is required');

console.log(payload);
console.log(summarizeResult('Login with valid credentials', 'passed'));

