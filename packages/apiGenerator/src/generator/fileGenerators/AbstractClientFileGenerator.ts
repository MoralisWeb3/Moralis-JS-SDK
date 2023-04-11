import { OperationInfo } from '../../reader/OpenApiContract';
import { NameFormatter } from './codeGenerators/NameFormatter';
import { TypeName } from '../../reader/utils/TypeName';
import { ResolvedType, TypeResolver } from './resolvers/TypeResolver';
import { TypeCodes, TypeCodesGenerator } from './codeGenerators/TypeCodesGenerator';
import { TypeScriptOutput } from '../output/TypeScriptOutput';
import { Output } from '../output/Output';
import { OperationParameterModelBuilder } from './modelBuilders/OperationParameterModelBuilder';
import { TypeInfoResolver } from './resolvers/TypeInfoResolver';
import { isReferenceTypeDescriptor } from '../../reader/TypeDescriptor';
import { ComplexTypePropertyModelBuilder } from './modelBuilders/ComplexTypePropertyModelBuilder';
import { ComplexTypePropertyModel } from './modelBuilders/ComplexTypePropertyModelBuilder';
import { JSDocTypeResolver } from './codeGenerators/JSDocTypeResolver';

export class AbstractClientFileGenerator {
  private readonly operationParameterModelBuilder = new OperationParameterModelBuilder(this.typeResolver);
  private readonly complexTypePropertyModelBuilder = new ComplexTypePropertyModelBuilder(this.typeResolver);

  public constructor(
    private readonly operations: OperationInfo[],
    private readonly typeResolver: TypeResolver,
    private readonly typeInfoResolver: TypeInfoResolver,
  ) {}

  public generate(): Output {
    const groupNames = [...new Set(this.operations.map((o) => o.groupName))];
    groupNames.sort();

    const operations = this.operations.map((operation: OperationInfo) => {
      const className = NameFormatter.getClassName(operation.operationId) + 'Operation';

      const resolvedResponseType = operation.response ? this.typeResolver.resolve(operation.response.descriptor) : null;
      const responseTypeCodes = resolvedResponseType
        ? TypeCodesGenerator.generate(resolvedResponseType, true)
        : TypeCodesGenerator.generateNull();
      const responseJsdocType = resolvedResponseType ? JSDocTypeResolver.resolve(resolvedResponseType) : null;

      let resolvedBodyType: ResolvedType | null = null;
      let bodyTypeCodes: TypeCodes | null = null;
      let bodyProperties: ComplexTypePropertyModel[] | null = null;
      if (operation.body) {
        resolvedBodyType = this.typeResolver.resolve(operation.body.descriptor);
        bodyTypeCodes = TypeCodesGenerator.generate(resolvedBodyType, operation.body.isRequired);

        if (isReferenceTypeDescriptor(operation.body.descriptor)) {
          const bodyComplexTypeInfo = this.typeInfoResolver.tryGetComplexType(operation.body.descriptor);
          if (bodyComplexTypeInfo) {
            bodyProperties = this.complexTypePropertyModelBuilder.build(bodyComplexTypeInfo.properties);
          }
        }
      }

      const endpointNormalizedName = NameFormatter.getParameterName(
        NameFormatter.getClassName(TypeName.from(operation.operationId)),
      );

      return {
        groupName: operation.groupName,
        description: operation.description,
        parameters: this.operationParameterModelBuilder.build(operation.parameters),
        className,
        responseTypeCodes,
        responseJsdocType,
        bodyTypeCodes,
        bodyProperties,
        endpointNormalizedName,
      };
    });

    const groups = groupNames.map((name) => {
      const safeName = NameFormatter.getParameterName(name);
      const groupOperations = operations.filter((o) => o.groupName === name);
      return {
        safeName: safeName,
        operations: groupOperations,
      };
    });

    // view:

    const output = new TypeScriptOutput();

    for (const operation of operations) {
      output.addImport(
        [operation.className, `${operation.className}Request`, `${operation.className}RequestJSON`],
        `../operations/${operation.className}`,
      );
      if (operation.responseTypeCodes.referenceType) {
        output.addImport(
          [
            operation.responseTypeCodes.referenceType.valueClassName,
            operation.responseTypeCodes.referenceType.jsonClassName,
          ],
          operation.responseTypeCodes.referenceType.importPath,
        );
      }
      if (operation.bodyTypeCodes?.referenceType) {
        output.addImport(
          [
            operation.bodyTypeCodes.referenceType.valueClassName,
            operation.bodyTypeCodes.referenceType.inputClassName,
            operation.bodyTypeCodes.referenceType.jsonClassName,
          ],
          operation.bodyTypeCodes.referenceType.importPath,
        );
      }
    }
    output.commitImports();

    output.write(0, `export interface OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON> {`);
    output.write(1, `operationId: string;`);
    output.write(1, `groupName: string;`);
    output.write(1, `httpMethod: string;`);
    output.write(1, `routePattern: string;`);
    output.write(1, `parameterNames: string[];`);
    output.write(1, `hasResponse: boolean;`);
    output.write(1, `hasBody: boolean;`);
    output.write(1, `serializeRequest?: (request: Request) => RequestJSON;`);
    output.write(1, `parseResponse?: (json: ResponseJSON) => Response;`);
    output.write(1, `serializeBody?: (body: Body) => BodyJSON;`);
    output.write(0, `}`);
    output.newLine();

    output.write(0, `export abstract class AbstractClient {`);

    output.write(1, `protected abstract createEndpoint<Request, RequestJSON, Response, ResponseJSON>(`);
    output.write(2, `operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, null, null>`);
    output.write(1, `): (request: Request) => Promise<Response>;`);

    output.write(
      1,
      'protected abstract createEndpointWithBody<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>(',
    );
    output.write(2, `operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>`);
    output.write(1, `): (request: Request, body: Body) => Promise<Response>;`);

    output.newLine();

    for (const group of groups) {
      output.write(1, `public readonly ${group.safeName} = {`);
      for (const operation of group.operations) {
        const factoryMethodName = operation.bodyTypeCodes ? 'createEndpointWithBody' : 'createEndpoint';

        const comment = output
          .createComment(2)
          .description(operation.description)
          .param(null, 'request', true, 'Request with parameters.');
        for (const parameter of operation.parameters) {
          comment.param(
            parameter.jsdocType,
            `request${parameter.name.normalizedAccessCode}`,
            parameter.isRequired,
            parameter.description,
          );
        }
        if (operation.bodyTypeCodes) {
          comment.param(null, 'body', true, 'Request body.');
        }
        if (operation.bodyProperties) {
          for (const bodyProperty of operation.bodyProperties) {
            comment.param(
              bodyProperty.jsdocType,
              `body${bodyProperty.name.normalizedAccessCode}`,
              bodyProperty.isRequired,
              bodyProperty.description,
            );
          }
        }
        if (operation.responseJsdocType) {
          comment.returns(operation.responseJsdocType, 'Response for the request.');
        }
        comment.apply();

        output.write(2, `${operation.endpointNormalizedName}: this.${factoryMethodName}<`);
        output.write(3, `${operation.className}Request,`);
        output.write(3, `${operation.className}RequestJSON,`);
        output.write(3, `${operation.responseTypeCodes.valueTypeCode},`);
        output.write(3, `${operation.responseTypeCodes.jsonTypeCode}` + (operation.bodyTypeCodes ? ',' : ''));
        if (operation.bodyTypeCodes) {
          output.write(3, `${operation.bodyTypeCodes.inputOrValueTypeCode}${operation.bodyTypeCodes.undefinedSuffix},`);
          output.write(3, `${operation.bodyTypeCodes.jsonTypeCode}${operation.bodyTypeCodes.undefinedSuffix}`);
        }
        output.write(2, `>(${operation.className}),`);
      }
      output.write(1, '};');
    }

    output.write(0, '}');
    return output;
  }
}
