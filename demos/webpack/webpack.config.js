const path = require('path');
const webpack = require('webpack');

require('dotenv').config({ path: './.env' });

function bundle(fileName) {
  return {
    cache: false,
    entry: `./src/${fileName}.ts`,
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      fallback: {
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        util: require.resolve('util'),
        stream: require.resolve('stream-browserify'),
        url: false,
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
        'process.env': JSON.stringify({
          MORALIS_API_KEY: process.env.MORALIS_API_KEY,
        }),
      }),
    ],
    output: {
      filename: `${fileName}.js`,
      path: path.resolve(__dirname, 'public/builds'),
    },
  };
}

module.exports = [bundle('esmApiTests'), bundle('umdApiTests')];
