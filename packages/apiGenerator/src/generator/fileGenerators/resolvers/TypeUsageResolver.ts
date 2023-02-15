import { ReferenceTypePointer } from '../../../reader/TypeDescriptor';
import { OpenApiReaderResult } from '../../../reader/OpenApiReaderResult';

export class TypeUsageResolver {
  public constructor(private readonly readerResult: OpenApiReaderResult) {}

  public isUsedByUnions(pointer: ReferenceTypePointer): boolean {
    const $ref = pointer.ref.toString();
    for (const unionType of this.readerResult.unionTypes) {
      if (unionType.unionDescriptors.some((descriptor) => descriptor.ref.toString() === $ref)) {
        return true;
      }
    }
    return false;
  }
}
