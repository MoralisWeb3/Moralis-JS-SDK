#!/usr/bin/env node
const { exec } = require('child_process');

function execAsync(cmd) {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
        throw error;
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

async function run(bundle, options, command) {
  // Cleanup
  console.log('Cleanup...');
  await execAsync('yarn cleanup');
  console.log('Cleanup done');

  // TODO: do in parrallel
  // // Building individual packages
  // console.log('@moralis/core build...');
  // await execAsync('yarn lerna run --scope @moralis/core build');
  // console.log('@moralis/core build done');
  // console.log('@moralis/utils build...');
  // await execAsync('yarn lerna run --scope @moralis/utils build');
  // console.log('@moralis/utils build done');

  // // build master package
  // console.log('@moralis/moralis build...');
  // await execAsync('yarn lerna run --scope moralis build');
  // console.log('@moralis/moralis build done');

  console.log('Rollup packages...');
  await execAsync('yarn rollup -c --scope=packages');
  console.log('Rollup packages done');
  console.log('Rollup master...');
  await execAsync('yarn rollup -c --scope=master');
  console.log('Rollup master done');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
