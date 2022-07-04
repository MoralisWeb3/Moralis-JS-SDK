/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = [
  {
    entry: './src/index.js',
    mode: 'production',
    output: {
      filename: 'index.js',
      libraryTarget: 'commonjs',
      path: path.resolve(__dirname, 'lib'),
    },
    node: {
      Buffer: true,
    },
    resolve: {
      extensions: ['.js'],
    },
  },
];
