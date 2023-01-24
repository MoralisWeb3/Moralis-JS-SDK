import { OpenAPIV3 } from 'openapi-types';
import { JsonRef } from './utils/JsonRef';
import { TypeDescriptorReader } from './TypeDescriptorReader';
import { NameFormatter } from './utils/NameFormatter';
import { ComplexTypeDescriptor, isComplexTypeDescriptor, TypeDescriptor } from './TypeDescriptor';
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
        if (isComplexTypeDescriptor(responseDescriptor)) {
          const target = JsonRef.find<OpenAPIV3.SchemaObject>(responseDescriptor.ref, this.document);
          if (target.type === 'array') {
            responseDescriptor = new ComplexTypeDescriptor(
              true,
              responseDescriptor.isRequired,
              JsonRef.extend(responseDescriptor.ref, ['items']),
              responseDescriptor.className,
            );
          }

          const rd = responseDescriptor as ComplexTypeDescriptor;
          this.queue.push(rd.ref, rd);
        }

        const parametersRef = JsonRef.extend(responseRef, ['parameters']);
        const parameters = this.processParameters(parametersRef, path.operationId, path.parameters);

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

  private processParameters(
    parametersRef: string,
    operationId: string,
    parameters?: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[],
  ) {
    const result: ParameterInfo[] = [];
    if (parameters) {
      for (let index = 0; index < parameters.length; index++) {
        const param = parameters[index];
        if ((param as OpenAPIV3.ReferenceObject).$ref) {
          throw new Error('Not supported ref parameters');
        }
        const parameter = param as OpenAPIV3.ParameterObject;

        const paramRef = JsonRef.extend(parametersRef, [String(index)]);
        const paramDefaultClassName = NameFormatter.joinName(operationId, parameter.name);
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

        result.push({
          name: parameter.name,
          descriptor: paramDescriptor,
        });
      }
    }
    return result;
  }
}
