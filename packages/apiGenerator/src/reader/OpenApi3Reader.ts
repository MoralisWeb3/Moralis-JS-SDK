import { OpenAPIV3 } from 'openapi-types';
import { ComplexTypeDescriptor } from './TypeDescriptor';
import { UniqueQueue } from './utils/UniqueQueue';
import { OnOperationDiscoveredHandler, PathsReader } from './PathsReader';
import {
  OnSimpleTypeDiscoveredHandler,
  OnComplexTypeDiscoveredHandler,
  ComplexTypesReader,
} from './ComplexTypesReader';

export class OpenApi3Reader {
  public static create(
    document: OpenAPIV3.Document,
    onOperationDiscovered: OnOperationDiscoveredHandler,
    onComplexTypeDiscovered: OnComplexTypeDiscoveredHandler,
    onSimpleTypeDiscovered: OnSimpleTypeDiscoveredHandler,
  ): OpenApi3Reader {
    if (!document.openapi.startsWith('3.0.')) {
      throw new Error(`Unsupported OpenApi version: ${document.openapi}`);
    }

    const queue = new UniqueQueue<ComplexTypeDescriptor>();
    return new OpenApi3Reader(
      new PathsReader(queue, document, onOperationDiscovered),
      new ComplexTypesReader(queue, document, onComplexTypeDiscovered, onSimpleTypeDiscovered),
    );
  }

  private constructor(
    private readonly pathsReader: PathsReader,
    private readonly complexTypesReader: ComplexTypesReader,
  ) {}

  public read() {
    this.pathsReader.process();
    this.complexTypesReader.process();
  }
}
