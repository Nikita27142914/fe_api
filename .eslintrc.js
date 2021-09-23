module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'no-var': 'error',
    'keyword-spacing': ['error', { 'before': true }]
  },
  globals: {
    process: 'readonly'
  },
}
