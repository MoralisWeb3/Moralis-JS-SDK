import { Generator } from './generator/Generator';
import { ConfigurationReader } from './configuration/ConfigurationReader';
import { OpenApiDownloader } from './reader/OpenApiDownloader';
import { OpenApiReader } from './reader/OpenApiReader';
import path from 'path';

async function run(projectPath: string) {
  if (!projectPath) {
    throw new Error('Invalid usage');
  }
  projectPath = path.join(__dirname, projectPath);

  const configuration = ConfigurationReader.read(projectPath);
  console.log(`📔 Swagger: ${configuration.url}`);

  const document = await OpenApiDownloader.download(configuration.url);
  const readerResult = OpenApiReader.create(document, configuration.openApiReader).read();
  const generator = Generator.create(readerResult, configuration, projectPath);
  generator.generate();

  console.log('✅ Done');
}

run(process.argv[2]);
