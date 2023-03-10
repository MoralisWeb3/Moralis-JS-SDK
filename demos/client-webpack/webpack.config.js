const path = require('path');
const webpack = require('webpack');
require('dotenv').config({ path: './.env' });

// All .env variables prefixed with this value are included in the build
const publicEnvPrefix = 'PUBLIC_';

function filterEnv(env) {
  return Object.entries(env)
    .filter(([key, value]) => key.startsWith(publicEnvPrefix))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      url: false,
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      util: require.resolve('util'),
      stream: require.resolve('stream-browserify'),
      http: false,
      https: false,
      os: false,
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(filterEnv(process.env)),
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
  },
};
