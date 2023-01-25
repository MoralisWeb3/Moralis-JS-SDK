import { OpenAPIV3 } from 'openapi-types';
import { OpenApiVersionReader } from '../OpenApiReader';
import { OpenApiReaderResult } from '../OpenApiReaderResult';
import { ComplexTypePointer } from '../TypeDescriptor';
import { UniqueQueue } from '../utils/UniqueQueue';
import { OperationsV3Reader } from './OperationsV3Reader';
import { TypeDescriptorV3Reader } from './TypeDescriptorV3Reader';
import { TypesV3Reader } from './TypesV3Reader';

export class OpenApiV3Reader implements OpenApiVersionReader {
  public static create(document: OpenAPIV3.Document) {
    return new OpenApiV3Reader(document);
  }

  private constructor(private readonly document: OpenAPIV3.Document) {}

  public read(): OpenApiReaderResult {
    const queue = new UniqueQueue<ComplexTypePointer>();
    const typeDescriptorReader = new TypeDescriptorV3Reader(this.document);
    const operationsReader = new OperationsV3Reader(this.document, typeDescriptorReader, queue);
    const typesReader = new TypesV3Reader(this.document, typeDescriptorReader, queue);

    operationsReader.read();
    typesReader.read();

    return {
      operations: operationsReader.operations,
      complexTypes: typesReader.complexTypes,
      simpleTypes: typesReader.simpleTypes,
    };
  }
}
