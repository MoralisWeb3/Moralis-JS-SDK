import { TypeName } from './utils/TypeName';
import { JsonRef } from './utils/JsonRef';

export interface TypeDescriptor {
  ref: JsonRef;
  isArray: boolean;
}

export interface ReferenceTypePointer {
  ref: JsonRef;
  typeName: TypeName;
}

export class ReferenceTypeDescriptor implements TypeDescriptor, ReferenceTypePointer {
  public constructor(
    public readonly isArray: boolean,
    public readonly ref: JsonRef,
    public readonly typeName: TypeName,
  ) {}
}

export class NativeTypeDescriptor implements TypeDescriptor {
  public constructor(
    public readonly isArray: boolean,
    public readonly ref: JsonRef,
    public readonly nativeType: string,
  ) {}
}

export enum UnionType {
  anyOf = 'anyOf',
  allOf = 'allOf',
  oneOf = 'oneOf',
}

export function isReferenceTypeDescriptor(descriptor: TypeDescriptor): descriptor is ReferenceTypeDescriptor {
  return Boolean((descriptor as ReferenceTypeDescriptor).typeName);
}

export function isNativeTypeDescriptor(descriptor: TypeDescriptor): descriptor is NativeTypeDescriptor {
  return Boolean((descriptor as NativeTypeDescriptor).nativeType);
}
