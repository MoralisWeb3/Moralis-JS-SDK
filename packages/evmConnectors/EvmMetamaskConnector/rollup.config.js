import nodePolyfills from 'rollup-plugin-node-polyfills';
import typescript from 'rollup-plugin-typescript2';
import packageJson from './package.json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import cleaner from 'rollup-plugin-cleaner';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import globals from 'rollup-plugin-node-globals';

export default {
  input: 'src/index.ts',
  external: ['@moralisweb3/core', '@moralisweb3/evm-connector-utils'],
  output: [
    {
      file: 'dist/index.umd.js',
      name: 'MoralisEvmMetamaskConnector',
      format: 'umd',
      sourcemap: true,
      globals: {
        '@moralisweb3/core': 'MoralisCore',
        '@moralisweb3/evm-connector-utils': 'MoralisEvmConnectorUtils',
      },
    },
    {
      file: packageJson.main,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    nodePolyfills(),
    cleaner({
      targets: ['./lib', './dist'],
    }),
    peerDepsExternal(),
    json(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    globals(),
  ],
};
