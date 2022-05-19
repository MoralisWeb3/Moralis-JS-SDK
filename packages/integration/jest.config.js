module.exports = {
  ...require('../../jest.config'),
  moduleNameMapper: {
    '^@moralis/evm-connector-utils$': '<rootDir>/../evmConnectors/EvmConnectorUtils/src',
    '^@moralis/evm-metamask-connector$': '<rootDir>/../evmConnectors/EvmMetamaskConnector/src',
    '^@moralis/evm-walletconnect-connector$': '<rootDir>/../evmConnectors/EvmWalletconnectConnector/src',
    '^@moralis/evm-api': '<rootDir>/../evmApi/src',
    '^@moralis/(.*)$': '<rootDir>/../$1/src',
  },
};
