const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');

const packages = [
  path.join(__dirname, '../moralis'),
  path.join(__dirname, '../core'),
  path.join(__dirname, '../server'),
  path.join(__dirname, '../evm'),
  path.join(__dirname, '../evmApi'),
  path.join(__dirname, '../evmConnectors/EvmConnectorUtils'),
  path.join(__dirname, '../evmConnectors/EvmMetamaskConnector'),
  path.join(__dirname, '../evmConnectors/EvmWalletconnectConnector'),
];

module.exports = {
  webpack: {
    configure: (webpackConfig, arg) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));
      if (isFound) {
        const include = Array.isArray(match.loader.include) ? match.loader.include : [match.loader.include];

        match.loader.include = include.concat(packages);
      }
      return webpackConfig;
    },
  },
};
