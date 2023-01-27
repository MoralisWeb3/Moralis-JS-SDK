import { TypeName } from './utils/TypeName';
import { JsonRef } from './utils/JsonRef';

export interface ComplexTypePointer {
  ref: JsonRef;
  typeName: TypeName;
}

export class ComplexTypeDescriptor implements TypeDescriptor, ComplexTypePointer {
  public constructor(
    public readonly isArray: boolean,
    public readonly ref: JsonRef,
    public readonly typeName: TypeName,
  ) {}
}

export class SimpleTypeDescriptor implements TypeDescriptor {
  public constructor(
    public readonly isArray: boolean,
    public readonly ref: JsonRef,
    public readonly simpleType: string,
  ) {}
}

export interface TypeDescriptor {
  ref: JsonRef;
  isArray: boolean;
}

export function isComplexTypeDescriptor(descriptor: TypeDescriptor): descriptor is ComplexTypeDescriptor {
  return !!(descriptor as ComplexTypeDescriptor).typeName;
}

export function isSimpleTypeDescriptor(description: TypeDescriptor): description is SimpleTypeDescriptor {
  return !!(description as SimpleTypeDescriptor).simpleType;
}
