import { OpenAPIV3 } from 'openapi-types';
import { JsonRef } from '../utils/JsonRef';
import { NameFormatter } from '../utils/NameFormatter';
import { ComplexTypePointer, isComplexTypeDescriptor } from '../TypeDescriptor';
import { UniquenessChecker } from '../utils/UniquenessChecker';
import { OperationBodyInfo, OperationInfo, OperationResponseInfo, ParameterInfo } from '../OpenApiReaderResult';
import { TypeDescriptorV3Reader } from './TypeDescriptorV3Reader';
import { UniqueQueue } from '../utils/UniqueQueue';

const successResponseCodes = ['200', '201', '202', '203', '204', '205'];

const BODY_CLASS_SUFFIX = 'Body';

export class OperationsV3Reader {
  public readonly operations: OperationInfo[] = [];
  private readonly operationIdUniquenessChecker = new UniquenessChecker();

  public constructor(
    private readonly document: OpenAPIV3.Document,
    private readonly typeDescriptorReader: TypeDescriptorV3Reader,
    private readonly queue: UniqueQueue<ComplexTypePointer>,
  ) {}

  public read() {
    if (!this.document.paths) {
      return;
    }

    for (const routePattern of Object.keys(this.document.paths)) {
      const pathGroup = this.document.paths[routePattern];
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
        const response = this.readResponse(operationRef, path.operationId, responseCode, responseBody);

        const parameters = this.readParameters(operationRef, path.operationId, path.parameters);
        const body = this.readBody(operationRef, path.operationId, path.requestBody);

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

  private readParameters(
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
      const descriptor = this.typeDescriptorReader.read(schema, ref, defaultClassName);
      if (isComplexTypeDescriptor(descriptor)) {
        this.queue.push(descriptor.ref.toString(), descriptor);
      }

      result.push({
        name: parameter.name,
        isRequired: parameter.required || false,
        descriptor: descriptor,
      });
    }
    return result;
  }

  private readResponse(
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

    const descriptor = this.typeDescriptorReader.read($refOrSchema, ref, defaultClassName);
    if (isComplexTypeDescriptor(descriptor)) {
      this.queue.push(descriptor.ref.toString(), descriptor);
    }

    return {
      descriptor,
    };
  }

  private readBody(
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
    const descriptor = this.typeDescriptorReader.read($refOrSchema, ref, defaultClassName);
    if (isComplexTypeDescriptor(descriptor)) {
      this.queue.push(descriptor.ref.toString(), descriptor);
    }

    return {
      descriptor,
      isRequired: body.required || false,
    };
  }
}
