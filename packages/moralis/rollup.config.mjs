import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import json from '@rollup/plugin-json';
import globals from 'rollup-plugin-node-globals';
import cleaner from 'rollup-plugin-cleaner';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const external = Object.keys(packageJson.dependencies);

function getCjsEsmConfig(clean, dir) {
  return [
    {
      input: `./src/${dir}index.ts`,
      plugins: [
        clean &&
          cleaner({
            targets: ['./dist', './lib'],
          }),
        typescript({
          useTsconfigDeclarationDir: true,
        }),
        nodeResolve(),
      ],
      external,
      cache: false,
      output: [
        {
          file: `./lib/cjs/${dir}index.cjs`,
          format: 'cjs',
          exports: 'named',
        },
        {
          file: `./lib/esm/${dir}index.js`,
          format: 'esm',
        },
      ],
    },
    {
      input: `./build/${dir}index.d.ts`,
      output: [
        {
          file: `./lib/${dir}index.d.ts`,
          format: 'es',
        },
      ],
      plugins: [dts()],
    },
  ];
}

function getUmdConfig() {
  const name = 'Moralis';
  return {
    input: 'lib/esm/index.js',
    output: [
      {
        file: `dist/moralis.js`,
        name,
        format: 'umd',
        sourcemap: true,
      },
      {
        file: `dist/moralis.min.js`,
        name,
        format: 'umd',
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      commonjs(),
      nodePolyfills(),
      peerDepsExternal(),
      nodeResolve({
        browser: true,
        preferBuiltins: false,
      }),
      json(),
      globals({}),
    ],
  };
}

export default [
  ...getCjsEsmConfig(true, ''),
  ...getCjsEsmConfig(false, 'commonCore/'),
  ...getCjsEsmConfig(false, 'streamsTypings/'),
  ...getCjsEsmConfig(false, 'commonEvmUtils/'),
  ...getCjsEsmConfig(false, 'commonSolUtils/'),
  ...getCjsEsmConfig(false, 'commonAptosUtils/'),
  ...getCjsEsmConfig(false, 'commonAuthUtils/'),
  ...getCjsEsmConfig(false, 'commonStreamsUtils/'),
  ...getCjsEsmConfig(false, 'auth/'),
  ...getCjsEsmConfig(false, 'streams/'),
  getUmdConfig(),
];
