// babel.config.js
// See: https://github.com/aelbore/esbuild-jest/issues/21

// /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // Required for correct sourcemaps
  preset: ['@babel/preset-typescript'],

  // preset: 'ts-jest',
  // testMatch: ['**/*.test.+(ts|tsx|js)'],
  // projects: [
  //   {
  //     // testMatch: ['<rootDir>/packages/server/**/*.test.+(ts|tsx|js)'],
  //     testMatch: ['<rootDir>/packages/integration/**/*.test.+(ts|tsx|js)'],
  //     displayName: '@moralis/server',
  //     transform: {
  //       '^.+\\.(ts|tsx)$': 'ts-jest',
  //     },
  //     testEnvironment: 'node',
  //   },
  // ],
  // Map workspaces to their source code so that Jest can resolve them correctly.
  moduleNameMapper: {
    '^@moralis/(.*)$': '<rootDir>/../$1/src',
  },
  // Use esbuild to transpile TypeScript files on the fly.
  transform: {
    '^.+\\.tsx?$': [
      'esbuild-jest',
      {
        sourcemap: true,
      },
    ],
  },
  collectCoverageFrom: ['**/src/**/*.{js,ts,jsx,tsx}'],
  coverageThreshold: null,
};
