module.exports = {
  env: {
    mocha: true,
  },
  globals: {
    expect: true,
  },
  rules: {
    /* unit tests will use chai expressions and construct classes to check for side effects */
    'no-unused-expressions': 'off',
    'no-new': 'off',
    'no-use-before-define': 'off',
    /* TODO: Change `=> call()` to `=> { call() }` in tests. */
    'no-promise-executor-return': 'off',
    /* TODO: Change `=> foo += 1` to `=> { foo += 1; }` in tests. */
    'no-return-assign': 'off',
    'no-console': 'off',
  },
};
