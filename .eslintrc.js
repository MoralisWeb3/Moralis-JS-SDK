module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['**/__tests__/**/*', '**/lib/**/*', '**/lib.esm/**/*', '**/*.test.ts'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    curly: 'error',
    'no-fallthrough': 'off',
    'no-constant-condition': 'off',
    'getter-return': 'off',
    'no-console': 'error',
    'no-var': 'error',
    'no-undef': 'off',
    'no-else-return': 'error',
    'no-extra-semi': 'off', // doesn't get along well with prettier
    'no-unused-vars': 'off', // got typescript for that,
    'no-redeclare': 'off', // No idea what it does, but it dies
    'require-yield': 'off', // Doesn't work with TS
    'no-dupe-class-members': 'off', // Allow overload types in classes
    '@typescript-eslint/ban-ts-comment': 'off', // Not advised to ignore ts rules, but we need to have an explicit way to do so
    '@typescript-eslint/no-empty-interface': 'off', // Allow empty interfaces for design/architecturing purposes
  },
  globals: {
    process: 'readable',
    global: 'readable',
    console: 'readable',
    setTimeout: 'readable',
    clearTimeout: 'readable',
    module: 'writable',
  },
};
