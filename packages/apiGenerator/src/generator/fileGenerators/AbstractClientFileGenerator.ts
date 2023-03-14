import { OperationInfo } from '../../reader/OpenApiContract';
import { NameFormatter } from './codeGenerators/NameFormatter';
import { TypeName } from '../../reader/utils/TypeName';
import { TypeResolver } from './resolvers/TypeResolver';
import { TypeCodesGenerator } from './codeGenerators/TypeCodesGenerator';
import { TypeScriptOutput } from '../output/TypeScriptOutput';
import { Output } from '../output/Output';

export class AbstractClientFileGenerator {
  public constructor(private readonly operations: OperationInfo[], private readonly typeResolver: TypeResolver) {}

  public generate(): Output {
    const output = new TypeScriptOutput();

    const groupNames = [...new Set(this.operations.map((o) => o.groupName))];
    groupNames.sort();

    const operations = this.operations.map((operation) => {
      const className = NameFormatter.getClassName(operation.operationId) + 'Operation';

      const resolvedResponseType = operation.response ? this.typeResolver.resolve(operation.response.descriptor) : null;
      const responseTypeCodes = resolvedResponseType
        ? TypeCodesGenerator.generate(resolvedResponseType, true)
        : TypeCodesGenerator.generateNull();

      const resolvedBodyType = operation.body ? this.typeResolver.resolve(operation.body.descriptor) : null;
      const bodyTypeCodes =
        resolvedBodyType && operation.body
          ? TypeCodesGenerator.generate(resolvedBodyType, operation.body.isRequired)
          : null;

      const parameterName = NameFormatter.getParameterName(
        NameFormatter.getClassName(TypeName.from(operation.operationId)),
      );

      return {
        groupName: operation.groupName,
        className,
        responseTypeCodes,
        bodyTypeCodes,
        parameterName,
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
        output.write(2, `${operation.parameterName}: this.${factoryMethodName}<`);
        output.write(3, `${operation.className}Request`);
        output.write(3, `, ${operation.className}RequestJSON`);
        output.write(3, `, ${operation.responseTypeCodes.valueTypeCode}`);
        output.write(3, `, ${operation.responseTypeCodes.jsonTypeCode}`);
        if (operation.bodyTypeCodes) {
          output.write(
            3,
            `, ${operation.bodyTypeCodes.inputOrValueTypeCode}${operation.bodyTypeCodes.undefinedSuffix}`,
          );
          output.write(3, `, ${operation.bodyTypeCodes.jsonTypeCode}${operation.bodyTypeCodes.undefinedSuffix}`);
        }
        output.write(2, `>(${operation.className}),`);
      }
      output.write(1, '};');
    }

    output.write(0, '}');
    return output;
  }
}
