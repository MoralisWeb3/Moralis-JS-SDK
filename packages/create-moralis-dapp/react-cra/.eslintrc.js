module.exports = {
  extends: ['@moralisweb3'],
  plugins: ['jest'],
  ignorePatterns: ['**/lib/**/*', '**/*.test.ts', '**/dist/**/*', '**/build/**/*', '**/generated/**/*'],
  rules: {
    'no-console': 'off',
    'no-html-link-for-pages': 'off',
  },
};
