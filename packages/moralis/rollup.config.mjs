import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import json from '@rollup/plugin-json';
import globals from 'rollup-plugin-node-globals';
import cleaner from 'rollup-plugin-cleaner';
import typescript from 'rollup-plugin-typescript2';
import fs from 'fs';

const external = Object.keys(JSON.parse(fs.readFileSync('./package.json', 'utf8')).dependencies);

/**
 * Generate UMD build, based on the input file.
 * 'input' should be preferably an ESM build.
 */
const getUmdConfig = ({ input, name, moduleName, outFolder }) => {
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
};

function getLibConfig(clean, input, outputDir) {
  return {
    input,
    plugins: [
      clean &&
        cleaner({
          targets: ['./dist', './lib', './lib.cjs', './lib.esm'],
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
        file: `./lib.cjs/${outputDir}index.cjs`,
        format: 'cjs',
        exports: 'named',
      },
      {
        file: `./lib.esm/${outputDir}index.js`,
        format: 'esm',
      },
    ],
  };
}

export default [
  getLibConfig(true, './src/index.ts', ''),
  getLibConfig(false, './src/commonCore/index.ts', 'commonCore/'),
  getLibConfig(false, './src/streamsTypings/index.ts', 'streamsTypings/'),
  getLibConfig(false, './src/commonEvmUtils/index.ts', 'commonEvmUtils/'),
  getLibConfig(false, './src/commonSolUtils/index.ts', 'commonSolUtils/'),
  getLibConfig(false, './src/commonAuthUtils/index.ts', 'commonAuthUtils/'),
  getLibConfig(false, './src/commonStreamsUtils/index.ts', 'commonStreamsUtils/'),
  getLibConfig(false, './src/auth/index.ts', 'auth/'),
  getLibConfig(false, './src/streams/index.ts', 'streams/'),
  getUmdConfig({
    input: 'lib.esm/index.js',
    name: 'Moralis',
    moduleName: 'moralis',
    outFolder: 'dist',
  }),
];
