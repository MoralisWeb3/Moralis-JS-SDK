import { OpenAPIV3 } from 'openapi-types';
import { JsonRef } from '../utils/JsonRef';
import { NameFormatter } from '../utils/NameFormatter';
import { isComplexTypeDescriptor } from '../TypeDescriptor';
import { ReadingContext } from './ReadingContext';
import { OperationBodyInfo, OperationInfo, OperationResponseInfo, ParameterInfo } from '../OpenApi3Reader';
import { UniquenessChecker } from '../utils/UniquenessChecker';

const successResponseCodes = ['200', '201', '202', '203', '204', '205'];

const BODY_CLASS_SUFFIX = 'Body';

export class PathsReader {
  public readonly operations: OperationInfo[] = [];
  private readonly operationIdUniquenessChecker = new UniquenessChecker();

  public constructor(private readonly context: ReadingContext) {}

  public process() {
    if (!this.context.document.paths) {
      return;
    }

    for (const routePattern of Object.keys(this.context.document.paths)) {
      const pathGroup = this.context.document.paths[routePattern];
      if (!pathGroup) {
        continue;
      }

      const operationHttpMethods = Object.keys(pathGroup) as OpenAPIV3.HttpMethods[];
      for (const httpMethod of operationHttpMethods) {
        const path = pathGroup[httpMethod]!;
        if (!path.operationId) {
          console.warn(`[no-operation-id] Path ${routePattern} does not have operationId`);
          continue;
        }

        this.operationIdUniquenessChecker.checkAndAdd(
          path.operationId,
          () => `Operation id ${path.operationId} is duplicated`,
        );

        const responseCode = successResponseCodes.find((code) => path.responses[code]);
        if (!responseCode) {
          const supportedCodes = Object.keys(path.responses);
          console.warn(
            `[no-success-response] Path ${routePattern} does not have any success response (found: ${supportedCodes.join(
              ', ',
            )})`,
          );
          continue;
        }

        const operationRef = JsonRef.from(['paths', routePattern, httpMethod]);

        const responseBody = path.responses[responseCode] as OpenAPIV3.ResponseObject;
        const response = this.processResponse(operationRef, path.operationId, responseCode, responseBody);

        const parameters = this.processParameters(operationRef, path.operationId, path.parameters);
        const body = this.processBody(operationRef, path.operationId, path.requestBody);

        this.operations.push({
          operationId: path.operationId,
          description: path.description,
          httpMethod,
          routePattern,
          response,
          body,
          parameters,
        });
      }
    }
  }

  private processParameters(
    operationRef: JsonRef,
    operationId: string,
    parameters?: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[],
  ) {
    const result: ParameterInfo[] = [];
    if (!parameters) {
      return result;
    }

    for (let index = 0; index < parameters.length; index++) {
      const $refOrParameter = parameters[index];
      if (($refOrParameter as OpenAPIV3.ReferenceObject).$ref) {
        throw new Error('Not supported $ref parameters');
      }

      const parameter = $refOrParameter as OpenAPIV3.ParameterObject;
      const schema = parameter.schema;
      if (!schema) {
        throw new Error('Parameter does not have schema');
      }

      const ref = operationRef.extend(['parameters', String(index)]);
      const defaultClassName = NameFormatter.joinName(operationId, parameter.name);
      const descriptor = this.context.descriptorReader.read(schema, ref, defaultClassName);
      if (isComplexTypeDescriptor(descriptor)) {
        this.context.queue.push(descriptor.ref.toString(), descriptor);
      }

      result.push({
        name: parameter.name,
        isRequired: parameter.required || false,
        descriptor: descriptor,
      });
    }
    return result;
  }

  private processResponse(
    operationRef: JsonRef,
    operationId: string,
    responseCode: string,
    response: OpenAPIV3.ResponseObject,
  ): OperationResponseInfo | null {
    const json = response.content ? response.content['application/json'] : null;
    const $refOrSchema = json ? json.schema : null;
    if (!$refOrSchema) {
      console.warn(`[no-response] Operation ${operationId} does not have a response`);
      return null;
    }

    const defaultClassName = NameFormatter.normalize(operationId);
    const ref = operationRef.extend(['responses', responseCode, 'content', 'application/json', 'schema']);

    const descriptor = this.context.descriptorReader.read($refOrSchema, ref, defaultClassName);
    if (isComplexTypeDescriptor(descriptor)) {
      this.context.queue.push(descriptor.ref.toString(), descriptor);
    }

    return {
      descriptor,
    };
  }

  private processBody(
    operationRef: JsonRef,
    operationId: string,
    $refOrBody?: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject,
  ): OperationBodyInfo | null {
    if (!$refOrBody) {
      return null;
    }
    if (($refOrBody as OpenAPIV3.ReferenceObject).$ref) {
      throw new Error('Not supported $ref request body');
    }

    const body = $refOrBody as OpenAPIV3.RequestBodyObject;
    const bodyJson = body.content['application/json'];
    const $refOrSchema = bodyJson ? bodyJson.schema : null;
    if (!$refOrSchema) {
      return null;
    }

    const ref = operationRef.extend(['requestBody', 'content', 'application/json', 'schema']);
    const defaultClassName = NameFormatter.normalize(operationId) + BODY_CLASS_SUFFIX;
    const descriptor = this.context.descriptorReader.read($refOrSchema, ref, defaultClassName);
    if (isComplexTypeDescriptor(descriptor)) {
      this.context.queue.push(descriptor.ref.toString(), descriptor);
    }

    return {
      descriptor,
      isRequired: body.required || false,
    };
  }
}
