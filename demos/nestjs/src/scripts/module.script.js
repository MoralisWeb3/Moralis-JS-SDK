const fs = require('fs');
const path = require('path');

const OUTPUT_DIRECTORY = './src/proxy';
const OUTPUT_FILENAME = 'proxy.module.ts';

const argv = require('minimist')(process.argv.slice(2));
const apiKeyVar = argv.k;

let content = '';

content += `/**
 * Automatically generated code, via Moralis
 * Do not modify manually
 */
`;

content += `import { Module } from '@nestjs/common';\n`;
content += `import { ProxyController } from './proxy.controller';\n`;
content += `import { ProxyService } from './proxy.service';\n`;
content += `import * as dotenv from 'dotenv';\n`;
content += `dotenv.config();\n`;

content += `
@Module({
  controllers: [ProxyController],
  providers: [
    {
      provide: 'EVM',
      useValue: new ProxyService('evm', process.env['${apiKeyVar}']),
    },
    {
      provide: 'SOLANA',
      useValue: new ProxyService('solana', process.env['${apiKeyVar}']),
    },
  ],
})
export class ProxyModule {}
`;

const genModule = async () => {
  console.log('Start generating automatic proxy module code...');
  const outputDirectory = path.join(process.cwd(), OUTPUT_DIRECTORY);
  const outputFile = path.join(outputDirectory, OUTPUT_FILENAME);

  await fs.promises.mkdir(outputDirectory, { recursive: true });
  await fs.promises.writeFile(outputFile, content, { encoding: 'utf8' });
  console.log('Done generating automatic proxy module code!');
};

genModule();
