import nodePolyfills from 'rollup-plugin-node-polyfills';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import cleaner from 'rollup-plugin-cleaner';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import babel from '@rollup/plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

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
        preferBuiltins: false,
      }),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
      babel({
        babelHelpers: 'bundled',
      }),
      globals(),
      uglify(),
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
        preferBuiltins: false,
      }),
      commonjs({}),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      babel({
        babelHelpers: 'bundled',
      }),
      globals(),
      uglify(),
    ],
  };
}
