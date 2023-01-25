import { OpenAPIV3 } from 'openapi-types';
import { JsonRef } from '../utils/JsonRef';
import { NameFormatter } from '../utils/NameFormatter';
import { isComplexTypeDescriptor } from '../TypeDescriptor';
import { ReadingContext } from './ReadingContext';
import { OperationBodyInfo, OperationInfo, OperationResponseInfo, ParameterInfo } from '../OpenApi3Reader';

const successResponseCodes = ['200', '201', '202', '203', '204', '205'];

export class PathsReader {
  public readonly operations: OperationInfo[] = [];
  private readonly usedOperationIds: string[] = [];

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
          console.warn(`Path ${routePattern} does not have operationId`);
          continue;
        }

        if (this.usedOperationIds.includes(path.operationId)) {
          throw new Error(`Operation id ${path.operationId} is duplicated`);
        }
        this.usedOperationIds.push(path.operationId);

        const responseCode = successResponseCodes.find((code) => path.responses[code]);
        if (!responseCode) {
          const supportedCodes = Object.keys(path.responses);
          console.warn(`Path ${routePattern} does not have any success response (found: ${supportedCodes.join(', ')})`);
          continue;
        }

        const operationRef = JsonRef.serialize(['paths', routePattern, httpMethod]);

        const responseBody = path.responses[responseCode] as OpenAPIV3.ResponseObject;
        const response = this.processResponse(operationRef, path.operationId, responseCode, responseBody);

        const parameters = this.processParameters(operationRef, path.operationId, path.parameters);
        const body = this.processBody(operationRef, path.operationId, path.requestBody);

        this.operations.push({
          operationId: path.operationId,
          httpMethod,
          routePattern,
          description: path.description,
          response,
          body,
          parameters,
        });
      }
    }
  }

  private processParameters(
    operationRef: string,
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

        const paramRef = JsonRef.extend(operationRef, ['parameters', String(index)]);
        const paramDefaultClassName = NameFormatter.joinName(operationId, parameter.name);
        const paramDescriptor = this.context.descriptorReader.read(parameter.schema, paramRef, paramDefaultClassName);
        if (isComplexTypeDescriptor(paramDescriptor)) {
          this.context.queue.push(paramDescriptor.ref, paramDescriptor);
        }

        result.push({
          name: parameter.name,
          isRequired: parameter.required || false,
          descriptor: paramDescriptor,
        });
      }
    }
    return result;
  }

  private processResponse(
    operationRef: string,
    operationId: string,
    responseCode: string,
    response: OpenAPIV3.ResponseObject,
  ): OperationResponseInfo {
    let responseRefOrSchema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | null = null;

    if (response.content) {
      const json = response.content['application/json'];
      if (json && json.schema) {
        responseRefOrSchema = json.schema;
      }
    }

    const responseDefaultClassName = NameFormatter.normalize(operationId);
    const responseRef = JsonRef.extend(operationRef, [
      'responses',
      responseCode,
      'content',
      'application/json',
      'schema',
    ]);

    const responseDescriptor = this.context.descriptorReader.read(
      responseRefOrSchema,
      responseRef,
      responseDefaultClassName,
    );
    if (isComplexTypeDescriptor(responseDescriptor)) {
      this.context.queue.push(responseDescriptor.ref, responseDescriptor);
    }

    return {
      descriptor: responseDescriptor,
    };
  }

  private processBody(
    operationRef: string,
    operationId: string,
    requestBody?: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject,
  ): OperationBodyInfo | undefined {
    if (requestBody) {
      if ((requestBody as OpenAPIV3.ReferenceObject).$ref) {
        throw new Error('Not supported ref request body');
      }

      const body = requestBody as OpenAPIV3.RequestBodyObject;
      const bodyRefOrSchema = body.content['application/json'].schema;
      const bodyRef = JsonRef.extend(operationRef, ['requestBody', 'content', 'application/json', 'schema']);

      const bodyDefaultClassName = NameFormatter.normalize(operationId) + 'Body';
      const bodyDescriptor = this.context.descriptorReader.read(bodyRefOrSchema, bodyRef, bodyDefaultClassName);
      if (isComplexTypeDescriptor(bodyDescriptor)) {
        this.context.queue.push(bodyDescriptor.ref, bodyDescriptor);
      }

      return {
        descriptor: bodyDescriptor,
        isRequired: body.required || false,
      };
    }
    return undefined;
  }
}
