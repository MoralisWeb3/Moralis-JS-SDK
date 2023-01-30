import { Generator } from './generator/Generator';
import { ConfigurationReader } from './configuration/ConfigurationReader';
import { OpenApiDownloader } from './reader/OpenApiDownloader';
import path from 'path';

async function run(outputPath: string) {
  if (!outputPath) {
    throw new Error('Invalid usage');
  }
  outputPath = path.join(__dirname, outputPath);

  const configuration = ConfigurationReader.read(outputPath);
  console.log(`📔 Swagger: ${configuration.url}`);

  const document = await OpenApiDownloader.download(configuration.url);
  const generator = Generator.create(document, configuration, outputPath);
  generator.generate();

  console.log('✅ Done');
}

run(process.argv[2]);
