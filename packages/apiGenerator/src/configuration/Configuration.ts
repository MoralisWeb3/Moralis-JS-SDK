import { OpenApiReaderConfiguration } from 'src/reader/OpenApiReaderConfiguration';
import { GeneratorConfiguration } from '../generator/GeneratorConfiguration';

export interface Configuration {
  url: string;
  generator: GeneratorConfiguration;
  openApiReader: OpenApiReaderConfiguration;
}
