const fs = require('fs');
const path = require('path');
const { generateFunctions } = require('./utils.js');

const OUTPUT_DIRECTORY = './src/routes';
const OUTPUT_FILENAME = 'proxy.ts';

const argv = require('minimist')(process.argv.slice(2));
const network = argv.n;

let content = '';

content += `/**
 * Automatically generated code, via Moralis
 * Do not modify manually
 */
`;

content += `import express from 'express';\n`;
content += `import Moralis from 'moralis';\n`;
content += `import { NextFunction, Request, Response } from 'express';\n`;
content += `export const proxyRouter = express.Router();\n`;

content += `
export interface TypedRequestBody<Params> extends Request {
  body: Params;
}

${
  network === 'evm'
    ? generateFunctions('evm')
    : network === 'solana'
    ? generateFunctions('solana')
    : generateFunctions('evm') + generateFunctions('solana')
}
`;

const genRoutes = async () => {
  console.log('Start generating automatic proxy routes code...');
  const outputDirectory = path.join(process.cwd(), OUTPUT_DIRECTORY);
  const outputFile = path.join(outputDirectory, OUTPUT_FILENAME);

  await fs.promises.mkdir(outputDirectory, { recursive: true });
  await fs.promises.writeFile(outputFile, content, { encoding: 'utf8' });
  console.log('Done generating automatic proxy routes code!');
};

genRoutes();
