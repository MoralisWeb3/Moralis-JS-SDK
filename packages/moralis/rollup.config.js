import nodePolyfills from 'rollup-plugin-node-polyfills';
import typescript from 'rollup-plugin-typescript2';
import packageJson from './package.json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import cleaner from 'rollup-plugin-cleaner';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import globals from 'rollup-plugin-node-globals';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.umd.js',
      name: 'Moralis',
      format: 'umd',
      sourcemap: true,
      globals: {
        '@moralisweb3/core': 'MoralisCore',
        '@moralisweb3/server': 'MoralisServer',
        '@moralisweb3/evm': 'MoralisEvm',
        '@moralisweb3/evm-api': 'MoralisEvmApi',
      },
    },
  ],
  external: ['@moralisweb3/core', '@moralisweb3/server', '@moralisweb3/evm-api', '@moralisweb3/evm'],
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
    babel(),
    globals(),
  ],
};
