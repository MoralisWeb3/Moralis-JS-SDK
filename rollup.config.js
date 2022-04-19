// reference: https://javascript.plainenglish.io/bundling-monorepos-the-right-way-34116aa50433
// https://ionicframework.com/blog/ionic-and-lerna-and-rollup-oh-my/
import { getPackages } from '@lerna/project';
import { filterPackages } from '@lerna/filter-packages';
import batchPackages from '@lerna/batch-packages';
import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const plugins = [peerDepsExternal(), json(), resolve(), commonjs()];

async function getSortedPackages(scope, ignore) {
  const packages = await getPackages(__dirname);
  console.log('Packages', packages);
  const filtered = filterPackages(packages, scope, ignore, true);

  return batchPackages(filtered).reduce((arr, batch) => arr.concat(batch), []);
}

async function main(args) {
  let scope = [];
  let ignore = [];

  // TODO: fix this args.scope, as it results in unrecognized option error
  if (args.scope === 'master') {
    scope = ['moralis'];
  } else {
    ignore = ['moralis'];
  }

  const config = [];
  const packages = await getSortedPackages(scope, ignore);
  packages.forEach((pkg) => {
    const { main, module } = pkg.toJSON();
    const basePath = path.relative(__dirname, pkg.location);
    const input = path.join(basePath, 'src/index.ts');

    config.push({
      input,
      output: [
        {
          file: path.join(basePath, module),
          format: 'esm',
          sourcemap: true,
        },
        {
          file: path.join(basePath, main),
          format: 'cjs',
          sourcemap: true,
        },
      ],
      plugins: [
        ...plugins,
        typescript({
          typescript: require('typescript'),
          tsconfig: path.join(basePath, 'tsconfig.json'),
        }),
      ],
    });
  });
  return config;
}

export default (args) => main(args);
