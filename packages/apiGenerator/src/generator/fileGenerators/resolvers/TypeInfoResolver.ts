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

  public getComplexType(pointer: TypeDescriptor): ComplexTypeInfo {
    const $ref = pointer.ref.toString();
    const result = this.contract.complexTypes.find((type) => type.descriptor.ref.toString() === $ref);
    if (!result) {
      throw new Error(`Complex type not found: ${$ref}`);
    }
    return result;
  }
}
