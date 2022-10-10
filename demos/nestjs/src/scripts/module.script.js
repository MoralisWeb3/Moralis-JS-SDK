const fs = require('fs');
const path = require('path');

const OUTPUT_DIRECTORY = './src/proxy';
const OUTPUT_FILENAME = 'proxy.module.ts';

let content = '';

content += `/**
 * Automatically generated code, via Moralis
 * Do not modify manually
 */
`;

content += `import { Module } from '@nestjs/common';\n`;
content += `import { ProxyController } from './proxy.controller';\n`;

content += `
@Module({
  controllers: [ProxyController],
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
