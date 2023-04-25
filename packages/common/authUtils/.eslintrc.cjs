module.exports = {
  extends: ['@moralisweb3'],
  plugins: ['jest'],
  ignorePatterns: [
    '**/lib/**/*',
    '**/*.test.ts',
    '**/dist/**/*',
    '**/build/**/*',
    '**/generated/**/*',
    'src/operations/openapi.ts',
  ],
};
