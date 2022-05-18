module.exports = {
  // Map workspaces to their source code so that Jest can resolve them correctly.
  moduleNameMapper: {
    '^@moralis/evm-connector-utils$': '<rootDir>/../evmConnectors/EvmConnectorUtils/src',
    '^@moralis/evm-metamask-connector$': '<rootDir>/../evmConnectors/EvmMetamaskConnector/src',
    '^@moralis/evm-walletconnect-connector$': '<rootDir>/../evmConnectors/EvmWalletconnectConnector/src',
    '^@moralis/evm-api': '<rootDir>/../evmApi/src',
    '^@moralis/(.*)$': '<rootDir>/../$1/src',
  },
  // Use esbuild to transpile TypeScript files on the fly.
  transform: {
    // TODO: coverage reporting is wrong, fix this OR use ts-jest instead
    // See: https://github.com/aelbore/esbuild-jest/issues/21
    // and https://github.com/aelbore/esbuild-jest/issues/59
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
