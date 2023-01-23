import { OpenAPIV3 } from 'openapi-types';
import { JsonRef } from './utils/JsonRef';
import { TypeDescriptorReader } from './TypeDescriptorReader';
import { NameFormatter } from './utils/NameFormatter';
import { ComplexTypeDescriptor, TypeDescriptor } from './TypeDescriptor';
import { UniqueQueue } from './utils/UniqueQueue';

const successResponseCodes = ['200', '201', '202', '203', '204', '205'];

export interface OperationInfo {
  operationId: string;
  httpMethod: string;
  routePattern: string;
  description?: string;
  responseDescriptor: TypeDescriptor;
  parameters: ParameterInfo[];
}

export interface ParameterInfo {
  name: string;
  descriptor: TypeDescriptor;
}

export type OnOperationDiscoveredHandler = (info: OperationInfo) => void;

export class PathsReader {
  public constructor(
    private readonly queue: UniqueQueue<ComplexTypeDescriptor>,
    private readonly document: OpenAPIV3.Document,
    private readonly onOperationDiscovered: OnOperationDiscoveredHandler,
  ) {}

  public process() {
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
        const responseDefaultClassName = hasMultipleHttpMethods
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

        let responseDescriptor = TypeDescriptorReader.read(
          true,
          responseRefOrSchema,
          responseRef,
          responseDefaultClassName,
        );
        let responseRefType = responseDescriptor as ComplexTypeDescriptor;
        if (responseRefType.ref) {
          const target = JsonRef.find<OpenAPIV3.SchemaObject>(responseRefType.ref, this.document);
          if (target.type === 'array') {
            responseRefType = new ComplexTypeDescriptor(
              true,
              responseDescriptor.isRequired,
              JsonRef.extend(responseRefType.ref, ['items']),
              responseRefType.className,
            );
            responseDescriptor = responseRefType;
          }

          this.queue.push(responseRefType.ref, responseRefType);
        }

        const parameters: ParameterInfo[] = [];
        if (path.parameters) {
          for (let index = 0; index < path.parameters.length; index++) {
            const param = path.parameters[index];
            if ((param as OpenAPIV3.ReferenceObject).$ref) {
              throw new Error('Not supported ref parameters');
            }
            const parameter = param as OpenAPIV3.ParameterObject;

            const paramRef = JsonRef.extend(responseRef, ['parameters', String(index)]);
            const paramDefaultClassName = NameFormatter.joinName(path.operationId, parameter.name);
            const paramDescriptor = TypeDescriptorReader.read(
              parameter.required || false,
              parameter.schema,
              paramRef,
              paramDefaultClassName,
            );
            const paramRefType = paramDescriptor as ComplexTypeDescriptor;
            if (paramRefType.ref) {
              this.queue.push(paramRefType.ref, paramRefType);
            }

            parameters.push({
              name: parameter.name,
              descriptor: paramDescriptor,
            });
          }
        }

        this.onOperationDiscovered({
          operationId: path.operationId,
          httpMethod,
          routePattern,
          description: path.description,
          responseDescriptor,
          parameters,
        });
      }
    }
  }
}
