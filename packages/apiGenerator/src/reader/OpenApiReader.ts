import { OpenAPIV3 } from 'openapi-types';
import { JsonRef } from './JsonRef';
import { MappingTypeReader } from './MappingTypeReader';
import { RefTypeMapping, TypeMapping } from './TypeMapping';
import { NameFormatter } from './NameFormatter';

const httpMethods: OpenAPIV3.HttpMethods[] = [
  OpenAPIV3.HttpMethods.GET,
  OpenAPIV3.HttpMethods.POST,
  OpenAPIV3.HttpMethods.PUT,
  OpenAPIV3.HttpMethods.DELETE,
];

const successResponseCodes = ['200', '201'];

interface ReaderQueueItem {
  done: boolean;
  type: RefTypeMapping;
}

export interface OperationInfo {
  operationId: string;
  httpMethod: string;
  routePattern: string;
  returnType: TypeMapping;
}

export interface TypeInfo {
  type: RefTypeMapping;
  properties: TypePropertyInfo[];
}

export interface TypePropertyInfo {
  name: string;
  description?: string;
  isRequired: boolean;
  type: TypeMapping;
}

export class OpenApiReader {
  private readonly queue: { [ref: string]: ReaderQueueItem } = {};

  public constructor(
    private readonly document: OpenAPIV3.Document,
    private readonly onOperationDiscovered: (info: OperationInfo) => void,
    private readonly onTypeDiscovered: (info: TypeInfo) => void,
  ) {}

  public read() {
    if (this.document.openapi !== '3.0.0') {
      throw new Error(`Unsupported OpenApi version: ${this.document.openapi}`);
    }

    this.processOperations();
    this.processQueue();
  }

  private processOperations() {
    if (!this.document.paths) {
      return;
    }

    for (const routePattern of Object.keys(this.document.paths)) {
      const pathGroup = this.document.paths[routePattern];
      if (!pathGroup) {
        continue;
      }

      for (const httpMethod of httpMethods) {
        const path = pathGroup[httpMethod];
        if (!path) {
          continue;
        }
        const responseCode = successResponseCodes.find((code) => path.responses[code]);
        if (!responseCode) {
          throw new Error(`Path ${routePattern} does not have success response`);
        }
        if (!path.operationId) {
          throw new Error(`Path ${routePattern} does not have operationId`);
        }

        let responseRefOrSchema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | null = null;

        const responseContent = (path.responses[responseCode] as OpenAPIV3.ResponseObject).content;
        if (responseContent) {
          const json = responseContent['application/json'];
          if (json && json.schema) {
            responseRefOrSchema = json.schema;
          }
        }

        const ref = JsonRef.serialize([
          'paths',
          routePattern,
          httpMethod,
          'responses',
          responseCode,
          'content',
          'application/json',
          'schema',
        ]);
        let type = MappingTypeReader.read(true, responseRefOrSchema, ref, path.operationId);
        let refType = type as RefTypeMapping;
        if (refType.ref) {
          const target = JsonRef.find<OpenAPIV3.SchemaObject>(refType.ref, this.document);
          if (target.type === 'array') {
            refType = new RefTypeMapping(
              true,
              type.isRequired,
              JsonRef.extend(refType.ref, ['items']),
              refType.className,
            );
            type = refType;
          }

          this.pushQueue(refType);
        }

        this.onOperationDiscovered({
          operationId: path.operationId,
          httpMethod,
          routePattern,
          returnType: type,
        });
      }
    }
  }

  private pushQueue(type: RefTypeMapping) {
    const current = this.queue[type.ref];
    if (!current) {
      this.queue[type.ref] = { done: false, type };
    }
  }

  private popQueue(): ReaderQueueItem | null {
    const nextRef = Object.keys(this.queue).find((r) => !this.queue[r].done);
    if (!nextRef) {
      return null;
    }
    return this.queue[nextRef];
  }

  private processQueue() {
    for (;;) {
      const item = this.popQueue();
      if (!item) {
        break;
      }

      const scheme = JsonRef.find<OpenAPIV3.SchemaObject>(item.type.ref, this.document);
      this.processType(item.type, scheme);
      item.done = true;
    }
  }

  private processType(type: RefTypeMapping, scheme: OpenAPIV3.SchemaObject) {
    if (scheme.type && scheme.type === 'array') {
      throw new Error('Not supported array scheme');
    }

    const properties: TypePropertyInfo[] = [];
    if (scheme.properties) {
      for (const propertyName of Object.keys(scheme.properties)) {
        const isRequired = scheme.required?.includes(propertyName) || false;
        const propertyRefOrSchema = scheme.properties[propertyName];

        const defaultClassName = NameFormatter.joinName(type.className, propertyName);
        const parentRef = JsonRef.extend(type.ref, ['properties', propertyName]);

        const propertyType = MappingTypeReader.read(isRequired, propertyRefOrSchema, parentRef, defaultClassName);
        const propertyRefType = propertyType as RefTypeMapping;
        if (propertyRefType.ref) {
          this.pushQueue(propertyRefType);
        }

        const description = (propertyRefOrSchema as OpenAPIV3.SchemaObject).description;

        properties.push({
          name: propertyName,
          isRequired,
          type: propertyType,
          description,
        });
      }
    }

    this.onTypeDiscovered({
      type,
      properties,
    });
  }
}
