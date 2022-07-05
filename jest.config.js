module.exports = {
  // Map workspaces to their source code so that Jest can resolve them correctly.
  moduleNameMapper: {
    '^@moralisweb3/evm-connector-utils$': '<rootDir>/../evmConnectors/EvmConnectorUtils/src',
    '^@moralisweb3/evm-metamask-connector$': '<rootDir>/../evmConnectors/EvmMetamaskConnector/src',
    '^@moralisweb3/evm-walletconnect-connector$': '<rootDir>/../evmConnectors/EvmWalletconnectConnector/src',
    '^@moralisweb3/evm-api': '<rootDir>/../evmApi/src',
    '^@moralisweb3/core': '<rootDir>/../core/src',
    '^@moralisweb3/(.*)$': '<rootDir>/../$1/src',
  },
  preset: 'ts-jest/presets/default',
  collectCoverageFrom: ['**/src/**/*.{js,ts,jsx,tsx}'],
  coverageThreshold: null,
};
