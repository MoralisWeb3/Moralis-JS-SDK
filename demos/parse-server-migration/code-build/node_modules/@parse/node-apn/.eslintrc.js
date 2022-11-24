module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    /* Check variables but not function arguments. */
    'eol-last': 2,
    'linebreak-style': ['error', 'unix'],
    'no-multiple-empty-lines': 1,
    'no-trailing-spaces': 2,
    'no-unused-vars': ['error', {args: 'none'}],
    'no-var': 'error',
    'prefer-const': 'error',
    'require-atomic-updates': 'off',
    'space-infix-ops': 'error',
    'space-in-parens': ['error', 'never'],
    'strict': ['error', 'never'],
  },
};
