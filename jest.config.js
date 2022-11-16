const path = require('path');

module.exports = {
  // Map workspaces to their source code so that Jest can resolve them correctly.
  moduleNameMapper: {
    '^@moralisweb3/evm-api': path.join(__dirname, 'packages/evmApi/src'),
    '^@moralisweb3/sol-api': path.join(__dirname, 'packages/solApi/src'),
    '^@moralisweb3/common-sol-utils': path.join(__dirname, 'packages/common/solUtils/src'),
    '^@moralisweb3/common-evm-utils': path.join(__dirname, 'packages/common/evmUtils/src'),
    '^@moralisweb3/api-utils': path.join(__dirname, 'packages/apiUtils/src'),
    '^@moralisweb3/test-utils': path.join(__dirname, 'packages/testUtils/src'),
    '^@moralisweb3/common-streams-utils': path.join(__dirname, 'packages/common/streamsUtils/src'),
    '^@moralisweb3/common-core': path.join(__dirname, 'packages/common/core/src'),
    '^@moralisweb3/(.*)$': path.join(__dirname, 'packages/$1/src'),
  },
  modulePaths: ['<rootDir>'],
  preset: 'ts-jest/presets/default',
  collectCoverageFrom: ['**/src/**/*.{js,ts,jsx,tsx}'],
  coverageThreshold: null,
  globals: {
    'ts-jest': {
      tsConfig: path.join(__dirname, 'tsconfig.package.json'),
    },
  },
  verbose: true,
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'json-summary'],
  coveragePathIgnorePatterns: ['.mock.ts', 'src/index.ts'],
};