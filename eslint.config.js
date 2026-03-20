import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/**',
      'playwright-topic-suites/reports/**',
      'playwright-topic-suites/test-results/**'
    ]
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prefer-const': 'warn'
    }
  },
  {
    files: ['playwright-topic-suites/tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
];

