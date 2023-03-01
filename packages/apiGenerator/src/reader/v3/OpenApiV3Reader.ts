import { OpenAPIV3 } from 'openapi-types';
import { OpenApiVersionReader } from '../OpenApiReader';
import { OpenApiContract } from '../OpenApiContract';
import { TypesQueue } from '../utils/TypesQueue';
import { OpenApiV3ReaderConfiguration } from './OpenApiV3ReaderConfiguration';
import { OperationsV3Reader } from './OperationsV3Reader';
import { TypeDescriptorV3Reader } from './TypeDescriptorV3Reader';
import { TypesV3Reader } from './TypesV3Reader';

export class OpenApiV3Reader implements OpenApiVersionReader {
  public static create(document: OpenAPIV3.Document, configuration: OpenApiV3ReaderConfiguration) {
    return new OpenApiV3Reader(document, configuration);
  }

  private constructor(
    private readonly document: OpenAPIV3.Document,
    private readonly configuration: OpenApiV3ReaderConfiguration,
  ) {}

  public read(): OpenApiContract {
    const queue = new TypesQueue();
    const typeDescriptorReader = new TypeDescriptorV3Reader(this.document);
    const operationsReader = new OperationsV3Reader(this.document, typeDescriptorReader, queue, this.configuration);
    const typesReader = new TypesV3Reader(this.document, typeDescriptorReader, queue);

    operationsReader.read();
    typesReader.read();

    return {
      operations: operationsReader.operations,
      complexTypes: typesReader.complexTypes,
      simpleTypes: typesReader.simpleTypes,
      unionTypes: typesReader.unionTypes,
    };
  }
}
