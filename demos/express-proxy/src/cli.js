#!/usr/bin/env node
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

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

const proxyGenerator = async () => {
  const argv = require('minimist')(process.argv.slice(2));
  const network = argv.n;

  if (!network) {
    console.error('Please specify a network using the -n flag');
    process.exit(1);
  } else if (network !== 'evm' && network !== 'solana' && network !== 'all') {
    console.error('Invalid network specified (must be "evm", "solana" or "all")');
    process.exit(1);
  }
  const folderdir = path.join(process.cwd(), './proxy');
  await fs.promises.rm(folderdir, { recursive: true, force: true });
  // Install dotenv to read the API key from the .env file
  await Promise.all([execCommand(`node ${__dirname}/scripts/genRoutes.js -n ${network} `)]);
};

proxyGenerator();
