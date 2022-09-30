const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    url: false,
    assert: require.resolve('assert'),
    buffer: require.resolve('buffer'),
    util: require.resolve('util'),
    stream: require.resolve('stream-browserify'),
    http: false,
    https: false,
    os: false,
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  );
  return config;
};
