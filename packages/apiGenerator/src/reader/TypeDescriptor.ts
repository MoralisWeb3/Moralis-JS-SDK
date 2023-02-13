import { TypeName } from './utils/TypeName';
import { JsonRef } from './utils/JsonRef';

export interface TypeDescriptor {
  ref: JsonRef;
  isArray: boolean;
}

export interface ReferenceTypePointer extends TypeDescriptor {
  typeName: TypeName;
}

export class ComplexTypeDescriptor implements TypeDescriptor, ReferenceTypePointer {
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

export class UnionTypeDescriptor implements TypeDescriptor, ReferenceTypePointer {
  public constructor(
    public readonly isArray: boolean,
    public readonly ref: JsonRef,
    public readonly typeName: TypeName,
    public readonly unionType: UnionType,
  ) {}
}

export enum UnionType {
  anyOf = 'anyOf',
  allOf = 'allOf',
  oneOf = 'oneOf',
}

export function isComplexTypeDescriptor(descriptor: TypeDescriptor): descriptor is ComplexTypeDescriptor {
  return !!(descriptor as ComplexTypeDescriptor).typeName && !(descriptor as UnionTypeDescriptor).unionType;
}

export function isSimpleTypeDescriptor(descriptor: TypeDescriptor): descriptor is SimpleTypeDescriptor {
  return !!(descriptor as SimpleTypeDescriptor).simpleType;
}

export function isUnionTypeDescriptor(descriptor: TypeDescriptor): descriptor is UnionTypeDescriptor {
  return !!(descriptor as UnionTypeDescriptor).unionType;
}

export function isReferencePointer(descriptor: TypeDescriptor): descriptor is ReferenceTypePointer {
  return isComplexTypeDescriptor(descriptor) || isUnionTypeDescriptor(descriptor);
}
