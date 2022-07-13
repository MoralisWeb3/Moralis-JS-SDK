import nodePolyfills from 'rollup-plugin-node-polyfills';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import cleaner from 'rollup-plugin-cleaner';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import globals from 'rollup-plugin-node-globals';
import babel from '@rollup/plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const isDev = (process.env.dev === 'true');

function uglifyIfProd() {
  return isDev ? undefined : uglify();
}

export function commonJs(packageJson) {
  const external = Object.keys(packageJson.dependencies);

  return {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    external,
    plugins: [
      cleaner({
        targets: ['lib'],
      }),
      typescript({ useTsconfigDeclarationDir: true }),
    ],
  };
}

export function esm(packageJson, internal) {
  const external = Object.keys(packageJson.dependencies).filter(d => d.startsWith('@moralisweb3/') && (!internal || !internal.includes(d)));

  return {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    external,
    plugins: [
      nodePolyfills(),
      cleaner({
        targets: ['dist/index.esm.js'],
      }),
      peerDepsExternal(),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      json(),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
      babel({
        babelHelpers: 'bundled',
      }),
      globals(),
      uglifyIfProd(),
    ],
  };
}

export function umd(outputName, packageJson, externanMap) {
  const external = Object.keys(packageJson.dependencies).filter(d => externanMap[d]);
  const outputGlobals = external.reduce((v, d) => {
    v[d] = externanMap[d];
    return v;
  }, {});

  return {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.umd.js',
        name: outputName,
        format: 'umd',
        sourcemap: true,
        globals: outputGlobals,
      },
    ],
    external,
    plugins: [
      nodePolyfills(),
      cleaner({
        targets: ['dist/index.umd.js'],
      }),
      peerDepsExternal(),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      json(),
      commonjs({}),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      babel({
        babelHelpers: 'bundled',
      }),
      globals(),
      uglifyIfProd(),
    ],
  };
}
