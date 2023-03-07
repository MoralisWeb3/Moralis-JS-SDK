import typescript from 'rollup-plugin-typescript2';
import cleaner from 'rollup-plugin-cleaner';
import fs from 'fs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';

const external = Object.keys(JSON.parse(fs.readFileSync('./package.json', 'utf8')).dependencies);

export default [
  {
    input: './src/index.ts',
    plugins: [
      cleaner({
        targets: ['./lib', './lib.cjs', './lib.esm'],
      }),
      nodePolyfills(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      nodeResolve(),
    ],
    cache: false,
    external,
    output: [
      {
        file: './lib.cjs/index.cjs',
        format: 'cjs',
        exports: 'named',
      },
      {
        file: './lib.esm/index.js',
        format: 'esm',
      },
    ],
  },
];
