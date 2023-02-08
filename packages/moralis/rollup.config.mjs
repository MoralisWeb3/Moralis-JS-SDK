import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import json from '@rollup/plugin-json';
import globals from 'rollup-plugin-node-globals';
import cleaner from 'rollup-plugin-cleaner';

/**
 * Generate UMD build, based on the input file.
 * 'input' should be preferably an ESM build.
 */
const getUMDConfig = ({ input, name, moduleName, outFolder }) => {
  const outputFiles = [
    `${outFolder}/${moduleName}.js`,
    `${outFolder}/${moduleName}.js.map`,
    `${outFolder}/${moduleName}.min.js`,
    `${outFolder}/${moduleName}.min.js.map`,
  ];

  return {
    input,
    output: [
      {
        file: `${outFolder}/${moduleName}.js`,
        name,
        format: 'umd',
        sourcemap: true,
      },
      {
        file: `${outFolder}/${moduleName}.min.js`,
        name,
        format: 'umd',
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      cleaner({
        targets: outputFiles,
      }),
      nodePolyfills(),
      peerDepsExternal(),
      commonjs(),
      nodeResolve({
        browser: true,
        preferBuiltins: false,
      }),
      json(),
      globals({}),
    ],
  };
};

export default [
  getUMDConfig({
    input: 'lib.esm/index.js',
    name: 'Moralis',
    moduleName: 'moralis',
    outFolder: 'dist',
  }),
];
