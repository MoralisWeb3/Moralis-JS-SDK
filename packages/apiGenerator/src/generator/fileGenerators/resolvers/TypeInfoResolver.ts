import { ReferenceTypePointer, TypeDescriptor } from '../../../reader/TypeDescriptor';
import { ComplexTypeInfo, OpenApiContract } from '../../../reader/OpenApiContract';

export class TypeInfoResolver {
  public constructor(private readonly contract: OpenApiContract) {}

  public isUsedByUnions(pointer: ReferenceTypePointer): boolean {
    const $ref = pointer.ref.toString();
    for (const unionType of this.contract.unionTypes) {
      if (unionType.unionDescriptors.some((descriptor) => descriptor.ref.toString() === $ref)) {
        return true;
      }
    }
    return false;
  }

  public isSimpleType(pointer: ReferenceTypePointer): boolean {
    const $ref = pointer.ref.toString();
    return this.contract.simpleTypes.some((type) => type.descriptor.ref.toString() === $ref);
  }

  public isUnionType(pointer: ReferenceTypePointer): boolean {
    const $ref = pointer.ref.toString();
    return this.contract.unionTypes.some((type) => type.descriptor.ref.toString() === $ref);
  }

  public tryGetComplexType(pointer: TypeDescriptor): ComplexTypeInfo | undefined {
    const $ref = pointer.ref.toString();
    return this.contract.complexTypes.find((type) => type.descriptor.ref.toString() === $ref);
  }
}
