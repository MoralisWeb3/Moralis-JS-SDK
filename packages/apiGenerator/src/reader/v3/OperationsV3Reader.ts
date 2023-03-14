import { OpenAPIV3 } from 'openapi-types';
import { JsonRef } from '../utils/JsonRef';
import { isReferenceTypeDescriptor, NativeTypeDescriptor } from '../TypeDescriptor';
import { UniquenessChecker } from '../utils/UniquenessChecker';
import { OperationBodyInfo, OperationInfo, OperationResponseInfo, ParameterInfo } from '../OpenApiContract';
import { TypeDescriptorV3Reader } from './TypeDescriptorV3Reader';
import { TypesQueue } from '../utils/TypesQueue';
import { TypeName } from '../utils/TypeName';
import { OpenApiV3ReaderConfiguration } from './OpenApiV3ReaderConfiguration';

const SUCCESS_RESPONSE_CODES = ['200', '201', '202', '203', '204', '205'];
const BODY_TYPE_NAME_SUFFIX = 'Body';

export class OperationsV3Reader {
  public readonly operations: OperationInfo[] = [];

  public constructor(
    private readonly document: OpenAPIV3.Document,
    private readonly typeDescriptorReader: TypeDescriptorV3Reader,
    private readonly queue: TypesQueue,
    private readonly configuration: OpenApiV3ReaderConfiguration,
  ) {}

  public read() {
    if (!this.document.paths) {
      return;
    }

    const operationIdUniquenessChecker = new UniquenessChecker();
    const groupRef = JsonRef.parse(this.configuration.operations.groupRef);
    const isEnabledRef = JsonRef.parse(this.configuration.operations.isEnabledRef);

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

        operationIdUniquenessChecker.check(path.operationId, () => `Operation id ${path.operationId} is duplicated`);

        const responseCode = SUCCESS_RESPONSE_CODES.find((code) => path.responses[code]);
        if (!responseCode) {
          const supportedCodes = Object.keys(path.responses).join(', ');
          console.warn(
            `[no-success-response] Path ${routePattern} does not have any success response (found: ${supportedCodes})`,
          );
          continue;
        }

        const isEnabled = isEnabledRef.tryFind<unknown>(path);
        if (!isEnabled) {
          continue;
        }

        const operationRef = JsonRef.from(['paths', routePattern, httpMethod]);

        const responseBody = path.responses[responseCode] as OpenAPIV3.ResponseObject;
        const response = this.readResponse(operationRef, path.operationId, responseCode, responseBody);

        const parameters = this.readParameters(operationRef, path.operationId, path.parameters);
        const body = this.readBody(operationRef, path.operationId, path.requestBody);

        const groupName = groupRef.find<string>(path);

        this.operations.push({
          operationId: path.operationId,
          groupName,
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

    const parameterNameUniquenessChecker = new UniquenessChecker();
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

      parameterNameUniquenessChecker.check(
        parameter.name,
        () => `Parameter name ${parameter.name} is duplicated (${operationRef.toString()})`,
      );

      const ref = operationRef.extend(['parameters', String(index), 'schema']);
      const defaultTypeName = TypeName.from(operationId).add(parameter.name);
      const descriptor = this.typeDescriptorReader.read(schema, ref, defaultTypeName);
      if (isReferenceTypeDescriptor(descriptor)) {
        this.queue.push(descriptor);
      }

      result.push({
        name: parameter.name,
        isRequired: parameter.required || false,
        descriptor: descriptor,
        description: parameter.description,
      });
    }

    if (this.configuration.operations.virtualParameters) {
      for (const virtualParameter of this.configuration.operations.virtualParameters) {
        if (virtualParameter.operationId && virtualParameter.operationId !== operationId) {
          continue;
        }

        parameterNameUniquenessChecker.check(
          virtualParameter.name,
          () => `Virtual parameter name ${virtualParameter.name} is duplicated (${operationRef.toString()})`,
        );

        const virtualDescriptor: NativeTypeDescriptor = {
          ref: JsonRef.from(['virtualParameter', virtualParameter.name]),
          isArray: false,
          nativeType: virtualParameter.nativeType,
        };
        result.push({
          name: virtualParameter.name,
          isRequired: virtualParameter.isRequired,
          descriptor: virtualDescriptor,
          description: virtualParameter.description,
        });
      }
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

    const defaultTypeName = TypeName.from(operationId);
    const ref = operationRef.extend(['responses', responseCode, 'content', 'application/json', 'schema']);

    const descriptor = this.typeDescriptorReader.read($refOrSchema, ref, defaultTypeName);
    if (isReferenceTypeDescriptor(descriptor)) {
      this.queue.push(descriptor);
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
    const defaultTypeName = TypeName.from(operationId).add(BODY_TYPE_NAME_SUFFIX);
    const descriptor = this.typeDescriptorReader.read($refOrSchema, ref, defaultTypeName);
    if (isReferenceTypeDescriptor(descriptor)) {
      this.queue.push(descriptor);
    }

    return {
      descriptor,
      isRequired: body.required || false,
    };
  }
}
