module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'no-var': 'error',
    'keyword-spacing': ['error', { 'before': true }]
  },
}
