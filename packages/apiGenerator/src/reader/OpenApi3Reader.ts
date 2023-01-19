import { OpenAPIV3 } from 'openapi-types';
import { JsonRef } from './JsonRef';
import { MappingTypeReader } from './MappingTypeReader';
import { RefTypeMapping, TypeMapping } from './TypeMapping';
import { NameFormatter } from './NameFormatter';
import { UniqueQueue } from './UniqueQueue';

const successResponseCodes = ['200', '201', '202', '203', '204', '205'];

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

export interface SimpleTypeInfo {
  type: TypeMapping;
  simpleType: string;
}

export class OpenApi3Reader {
  private readonly queue = new UniqueQueue<RefTypeMapping>();

  public constructor(
    private readonly document: OpenAPIV3.Document,
    private readonly onOperationDiscovered: (info: OperationInfo) => void,
    private readonly onTypeDiscovered: (info: TypeInfo) => void,
    private readonly onSimpleTypeDiscovered: (info: SimpleTypeInfo) => void,
  ) {}

  public read() {
    if (!this.document.openapi.startsWith('3.0.')) {
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

      const operationHttpMethods = Object.keys(pathGroup) as OpenAPIV3.HttpMethods[];
      const hasMultipleHttpMethods = operationHttpMethods.length > 1;

      for (const httpMethod of operationHttpMethods) {
        const path = pathGroup[httpMethod]!;
        if (!path.operationId) {
          console.warn(`Path ${routePattern} does not have operationId`);
          continue;
        }

        const responseCode = successResponseCodes.find((code) => path.responses[code]);
        if (!responseCode) {
          const supportedCodes = Object.keys(path.responses);
          console.warn(`Path ${routePattern} does not have any success response (found: ${supportedCodes.join(', ')})`);
          continue;
        }

        let responseRefOrSchema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | null = null;

        const responseContent = (path.responses[responseCode] as OpenAPIV3.ResponseObject).content;
        if (responseContent) {
          const json = responseContent['application/json'];
          if (json && json.schema) {
            responseRefOrSchema = json.schema;
          }
        }

        const normalizedOperationId = NameFormatter.normalize(path.operationId);
        const defaultClassName = hasMultipleHttpMethods
          ? NameFormatter.joinName(httpMethod, normalizedOperationId)
          : normalizedOperationId;
        const responseRef = JsonRef.serialize([
          'paths',
          routePattern,
          httpMethod,
          'responses',
          responseCode,
          'content',
          'application/json',
          'schema',
        ]);

        let type = MappingTypeReader.read(true, responseRefOrSchema, responseRef, defaultClassName);
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

          this.queue.push(refType.ref, refType);
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

  private processQueue() {
    for (;;) {
      const type = this.queue.pop();
      if (!type) {
        break;
      }
      this.processType(type);
    }
  }

  private processType(type: RefTypeMapping) {
    const scheme = JsonRef.find<OpenAPIV3.SchemaObject>(type.ref, this.document);

    if (scheme.type) {
      if (scheme.type === 'array') {
        throw new Error('Not supported array scheme');
      }
      if (scheme.type !== 'object') {
        this.onSimpleTypeDiscovered({
          type,
          simpleType: scheme.type,
        });
        return;
      }
    }

    const properties: TypePropertyInfo[] = [];
    if (scheme.properties) {
      for (const name of Object.keys(scheme.properties)) {
        const isRequired = scheme.required?.includes(name) || false;
        const propertyRefOrSchema = scheme.properties[name];

        const defaultClassName = NameFormatter.joinName(type.className, name);
        const parentRef = JsonRef.extend(type.ref, ['properties', name]);

        const propertyType = MappingTypeReader.read(isRequired, propertyRefOrSchema, parentRef, defaultClassName);
        const propertyRefType = propertyType as RefTypeMapping;
        if (propertyRefType.ref) {
          this.queue.push(propertyRefType.ref, propertyRefType);
        }

        const description = (propertyRefOrSchema as OpenAPIV3.SchemaObject).description;

        properties.push({
          name,
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
