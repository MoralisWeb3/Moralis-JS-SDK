import { ComplexTypeDescriptor, TypeDescriptor, UnionTypeDescriptor } from './TypeDescriptor';

export interface OpenApiReaderResult {
  operations: OperationInfo[];
  complexTypes: ComplexTypeInfo[];
  simpleTypes: SimpleTypeInfo[];
  unionTypes: UnionTypeInfo[];
}

export interface ComplexTypeInfo {
  descriptor: ComplexTypeDescriptor;
  properties: PropertyInfo[];
}

export interface PropertyInfo {
  name: string;
  description?: string;
  isRequired: boolean;
  descriptor: TypeDescriptor;
}

export interface SimpleTypeInfo {
  descriptor: ComplexTypeDescriptor;
  simpleType: string;
  enum?: string[];
}

export interface UnionTypeInfo {
  descriptor: UnionTypeDescriptor;
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
}
