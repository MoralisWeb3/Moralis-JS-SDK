const fs = require('fs');
const path = require('path');
const { generateFunctions } = require('./utils');

const OUTPUT_DIRECTORY = './src/proxy';
const OUTPUT_FILENAME = 'proxy.controller.ts';

const argv = require('minimist')(process.argv.slice(2));
const network = argv.n;

let content = '';

content += `/**
 * Automatically generated code, via Moralis
 * Do not modify manually
 */
`;

content += `import { Body, Controller, Param, Post, Query, Get, Put, Inject } from '@nestjs/common';\n`;
content += `import { ProxyService } from './proxy.service';\n`;

content += `
@Controller('MoralisAPIProxy')
export class ProxyController {
  constructor(
    @Inject('EVM') public evmProxyService: ProxyService,
    @Inject('SOLANA') public solanaProxyService: ProxyService,
  ) {}
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
