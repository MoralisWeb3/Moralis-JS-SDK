const fs = require('fs');
const path = require('path');
const { generateFunctions } = require('./utils');

const OUTPUT_DIRECTORY = './src/proxy';
const OUTPUT_FILENAME = 'proxy.controller.ts';

const argv = require('minimist')(process.argv.slice(2));
const network = argv.n;
const apiKeyVar = argv.k;

let content = '';

content += `/**
 * Automatically generated code, via Moralis
 * Do not modify manually
 */
`;

content += `import { Body, Controller, Post, BadRequestException } from '@nestjs/common';\n`;
content += `import Moralis from 'moralis';\n`;
content += `import * as dotenv from 'dotenv';\n`;
content += `dotenv.config();\n`;

content += `
@Controller('MoralisAPIProxy')
export class ProxyController {
  constructor(
  ) {
    Moralis.start({
      apiKey: process.env['${apiKeyVar}'],
    })
  }
  ${
    network === 'evm'
      ? generateFunctions('evm')
      : network === 'solana'
      ? generateFunctions('solana')
      : generateFunctions('evm') + generateFunctions('solana')
  }
}
`;

const genController = async () => {
  console.log('Start generating automatic proxy controller code...');
  const outputDirectory = path.join(process.cwd(), OUTPUT_DIRECTORY);
  const outputFile = path.join(outputDirectory, OUTPUT_FILENAME);

  await fs.promises.mkdir(outputDirectory, { recursive: true });
  await fs.promises.writeFile(outputFile, content, { encoding: 'utf8' });
  console.log('Done generating automatic proxy controller code!');
};

genController();
