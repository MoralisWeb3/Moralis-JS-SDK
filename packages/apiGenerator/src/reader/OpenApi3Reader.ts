import { OpenAPIV3 } from 'openapi-types';
import { ComplexTypesReader } from './readers/ComplexTypesReader';
import { PathsReader } from './readers/PathsReader';
import { ReadingContext } from './readers/ReadingContext';
import { ComplexTypeDescriptor, TypeDescriptor } from './TypeDescriptor';

export interface ReaderResult {
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

export class OpenApi3Reader {
  public static create(document: OpenAPIV3.Document): OpenApi3Reader {
    if (!document.openapi.startsWith('3.0.')) {
      throw new Error(`Unsupported OpenApi version: ${document.openapi}`);
    }

    return new OpenApi3Reader(document);
  }

  private constructor(private readonly document: OpenAPIV3.Document) {}

  public read(): ReaderResult {
    const context = ReadingContext.create(this.document);
    const pathsReader = new PathsReader(context);
    const complexTypesReader = new ComplexTypesReader(context);

    pathsReader.process();
    complexTypesReader.process();

    return {
      operations: pathsReader.operations,
      complexTypes: complexTypesReader.complexTypes,
      simpleTypes: complexTypesReader.simpleTypes,
    };
  }
}
