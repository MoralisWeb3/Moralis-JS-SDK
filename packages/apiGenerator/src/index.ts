import { Generator } from './generator/Generator';
import { ConfigurationReader } from './configuration/ConfigurationReader';
import { OpenApiDownloader } from './reader/OpenApiDownloader';
import path from 'path';

async function run() {
  const outputPath = path.join(__dirname, '../../common/aptUtils/src');

  const configuration = ConfigurationReader.read(outputPath);
  const document = await OpenApiDownloader.download(configuration.url);
  const generator = Generator.create(document, configuration, outputPath);
  generator.generate();

  console.log('✅ Done');
}

run();
