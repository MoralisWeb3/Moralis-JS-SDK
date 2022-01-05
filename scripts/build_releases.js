const pkg = require('../package.json');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { getNextReleaseVersion } = require('./getNextReleaseVersion');

const rmDir = function (dirPath) {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    files.forEach(function (file) {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        rmDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
};

const execCommand = function (cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
        return reject(error);
      }
      const output = stdout ? stdout : stderr;
      console.log(output);
      resolve(output);
    });
  });
};

(async function () {
  console.log(`Calculating next semantic version`);

  const nextVersion = await getNextReleaseVersion();

  console.log(`Building JavaScript SDK v${nextVersion}...\n`);

  console.log('Cleaning up old builds...\n');

  rmDir(path.join(__dirname, 'dist'));
  rmDir(path.join(__dirname, 'lib'));

  const crossEnv = 'npm run cross-env';
  const gulp = 'npm run gulp';
  console.log('Browser Release:');
  console.log('Weapp Release:');
  console.log('Node.js Release:');
  console.log('React Native Release:');
  console.log('Web3Api Release:');
  await Promise.all([
    execCommand(`${crossEnv} PARSE_BUILD=browser NEXT_VERSION=${nextVersion} ${gulp} compile`),
    execCommand(`${crossEnv} PARSE_BUILD=weapp NEXT_VERSION=${nextVersion} ${gulp} compile`),
    execCommand(`${crossEnv} PARSE_BUILD=node NEXT_VERSION=${nextVersion} ${gulp} compile`),
    execCommand(`${crossEnv} PARSE_BUILD=react-native NEXT_VERSION=${nextVersion} ${gulp} compile`),
    execCommand(
      `npm run generate-web3Api && ${crossEnv} PARSE_BUILD=web3api ${gulp} compile-web3api`
    ),
  ]);
  console.log('Bundling and minifying for CDN distribution:');
  await Promise.all([
    execCommand(`${crossEnv} NEXT_VERSION=${nextVersion} ${gulp} browserify`),
    execCommand(`${crossEnv} NEXT_VERSION=${nextVersion} ${gulp} browserify-weapp`),
    execCommand(`${crossEnv} NEXT_VERSION=${nextVersion} ${gulp} browserify-web3api`),
  ]);
  await Promise.all([
    execCommand(`${crossEnv} NEXT_VERSION=${nextVersion} ${gulp} minify`),
    execCommand(`${crossEnv} NEXT_VERSION=${nextVersion} ${gulp} minify-weapp`),
    execCommand(`${crossEnv} NEXT_VERSION=${nextVersion} ${gulp} minify-web3api`),
  ]);
})();
