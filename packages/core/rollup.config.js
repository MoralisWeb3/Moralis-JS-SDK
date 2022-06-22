import nodePolyfills from 'rollup-plugin-node-polyfills';
import typescript from 'rollup-plugin-typescript2';
import packageJson from './package.json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import cleaner from 'rollup-plugin-cleaner';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
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
      file: 'dist/index.js',
      name: 'Core',
      format: 'umd',
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
    replace(),
    typescript({ useTsconfigDeclarationDir: true }),
    babel(),
    globals(),
  ],
};
