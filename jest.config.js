module.exports = {
  // Map workspaces to their source code so that Jest can resolve them correctly.
  moduleNameMapper: {
    '^@moralisweb3/evm-api': '<rootDir>/../evmApi/src',
    '^@moralisweb3/api-utils': '<rootDir>/../api-utils/src',
    '^@moralisweb3/core': '<rootDir>/../core/src',
    '^@moralisweb3/(.*)$': '<rootDir>/../$1/src',
  },
  modulePaths: ['<rootDir>'],
  preset: 'ts-jest/presets/default',
  collectCoverageFrom: ['**/src/**/*.{js,ts,jsx,tsx}'],
  coverageThreshold: null,
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/../../tsconfig.package.json',
    },
  },
};
