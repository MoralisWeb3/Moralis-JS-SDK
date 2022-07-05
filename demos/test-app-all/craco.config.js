const path = require('path'); // eslint-disable-line
const { getLoader, loaderByName } = require('@craco/craco'); // eslint-disable-line

const packages = [
  path.join(__dirname, '../../packages/moralis'),
  path.join(__dirname, '../../packages/core'),
  path.join(__dirname, '../../packages/server'),
  path.join(__dirname, '../../packages/evm'),
  path.join(__dirname, '../../packages/evmApi'),
  path.join(__dirname, '../../packages/evmConnectors/EvmConnectorUtils'),
  path.join(__dirname, '../../packages/evmConnectors/EvmMetamaskConnector'),
  path.join(__dirname, '../../packages/evmConnectors/EvmWalletconnectConnector'),
];

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));
      if (isFound) {
        const include = Array.isArray(match.loader.include) ? match.loader.include : [match.loader.include];

        match.loader.include = include.concat(packages);
      }
      return webpackConfig;
    },
  },
};
