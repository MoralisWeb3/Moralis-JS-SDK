module.exports = {
  extends: ['@moralisweb3'],
  plugins: ['jest'],
  ignorePatterns: ['**/lib/**/*', '**/*.test.ts', '**/dist/**/*', '**/build/**/*', '**/generated/**/*'],
  rules: {
    'no-console': 'off',
  },
};
