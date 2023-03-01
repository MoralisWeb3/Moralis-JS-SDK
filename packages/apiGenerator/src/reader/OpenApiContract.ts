import { ReferenceTypeDescriptor, TypeDescriptor, UnionType } from './TypeDescriptor';

export interface OpenApiContract {
  operations: OperationInfo[];
  complexTypes: ComplexTypeInfo[];
  simpleTypes: SimpleTypeInfo[];
  unionTypes: UnionTypeInfo[];
}

export interface ComplexTypeInfo {
  descriptor: ReferenceTypeDescriptor;
  properties: PropertyInfo[];
}

export interface PropertyInfo {
  name: string;
  description?: string;
  isRequired: boolean;
  descriptor: TypeDescriptor;
}

export interface SimpleTypeInfo {
  descriptor: ReferenceTypeDescriptor;
  nativeType: string; // 'string', 'number', 'object'...
  enum?: string[];
}

export interface UnionTypeInfo {
  descriptor: ReferenceTypeDescriptor;
  unionType: UnionType;
  unionDescriptors: TypeDescriptor[];
}

export interface OperationInfo {
  operationId: string;
  groupName: string;
  httpMethod: string;
  routePattern: string;
  description?: string;
  response: OperationResponseInfo | null;
  body: OperationBodyInfo | null;
  parameters: ParameterInfo[];
}

export interface OperationResponseInfo {
  descriptor: TypeDescriptor;
}

export interface OperationBodyInfo {
  descriptor: TypeDescriptor;
  isRequired: boolean;
}

export interface ParameterInfo {
  name: string;
  isRequired: boolean;
  descriptor: TypeDescriptor;
  description?: string;
}
