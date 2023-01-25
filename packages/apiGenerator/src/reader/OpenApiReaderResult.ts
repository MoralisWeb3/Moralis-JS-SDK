import { ComplexTypeDescriptor, TypeDescriptor } from './TypeDescriptor';

export interface OpenApiReaderResult {
  operations: OperationInfo[];
  complexTypes: ComplexTypeInfo[];
  simpleTypes: SimpleTypeInfo[];
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
}

export interface OperationInfo {
  operationId: string;
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
