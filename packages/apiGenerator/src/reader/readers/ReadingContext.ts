import { OpenAPIV3 } from 'openapi-types';
import { ComplexTypePointer } from '../TypeDescriptor';
import { UniqueQueue } from '../utils/UniqueQueue';
import { TypeDescriptorReader } from './TypeDescriptorReader';

export class ReadingContext {
  public static create(document: OpenAPIV3.Document): ReadingContext {
    return new ReadingContext(document, new UniqueQueue(), new TypeDescriptorReader(document));
  }

  public constructor(
    public readonly document: OpenAPIV3.Document,
    public readonly queue: UniqueQueue<ComplexTypePointer>,
    public readonly descriptorReader: TypeDescriptorReader,
  ) {}
}
