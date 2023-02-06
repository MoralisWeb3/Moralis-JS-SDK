import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import json from '@rollup/plugin-json';
import globals from 'rollup-plugin-node-globals';
import cleaner from 'rollup-plugin-cleaner';

const getUMDConfig = () => {
  return {
    input: 'lib.esm/index.js',
    external: ['ethers', '@solana/web3.js'],
    output: [
      {
        file: 'dist/moralis.js',
        name: `Moralis`,
        format: 'umd',
        sourcemap: true,
        globals: {
          '@solana/web3.js': 'solanaWeb3',
          ethers: 'ethers',
        },
      },
      {
        file: 'dist/moralis.min.js',
        name: `Moralis`,
        format: 'umd',
        sourcemap: true,
        globals: {
          '@solana/web3.js': 'solanaWeb3',
          ethers: 'ethers',
        },
        plugins: [terser()],
      },
    ],
    plugins: [
      cleaner({
        targets: ['dist/moralis.js', 'dist/moralis.js.map'],
      }),
      nodePolyfills(),
      peerDepsExternal(),
      commonjs(),
      nodeResolve({
        browser: true,
        preferBuiltins: false,
        resolveOnly: (module) => !['ethers', '@solana/web3.js'].includes(module),
      }),
      json(),
      globals({}),
    ],
  };
};

export default [getUMDConfig()];
