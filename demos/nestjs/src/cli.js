#!/usr/bin/env node
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

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
  const apiKeyVar = argv.k;

  if (!network) {
    console.error('Please specify a network using the -n flag');
    process.exit(1);
  } else if (network !== 'evm' && network !== 'solana' && network !== 'all') {
    console.error('Invalid network specified (must be "evm", "solana" or "all")');
    process.exit(1);
  }
  if (!apiKeyVar) {
    console.error('Please specify an API key variable using the -k flag');
    process.exit(1);
  }
  const folderdir = path.join(process.cwd(), './src/proxy');
  await fs.promises.rm(folderdir, { recursive: true, force: true });
  // Install dotenv to read the API key from the .env file
  await execCommand('yarn add dotenv');
  await execCommand('nest g module proxy --no-spec');
  await Promise.all([
    execCommand(`node ${__dirname}/scripts/service.script.js`),
    execCommand(`node ${__dirname}/scripts/controller.script.js -n ${network}`),
    execCommand(`node ${__dirname}/scripts/module.script.js -k ${apiKeyVar}`),
  ]);
};

proxyGenerator();
