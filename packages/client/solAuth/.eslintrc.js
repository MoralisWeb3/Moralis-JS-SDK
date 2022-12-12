module.exports = {
  extends: ['@moralisweb3'],
  plugins: ['jest'],
  env: { browser: true },
  ignorePatterns: ['**/lib/**/*', '**/*.test.ts', '**/dist/**/*', '**/build/**/*', '**/generated/**/*'],
};
