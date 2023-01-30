import { OperationInfo } from '../../reader/OpenApiReaderResult';
import { NameFormatter } from './codeGenerators/NameFormatter';
import { GeneratorOutput } from '../GeneratorOutput';
import { TypeName } from '../../reader/utils/TypeName';
import { TypeResolver } from './TypeResolver';
import { TypeCodesGenerator } from './codeGenerators/TypeCodesGenerator';

const BASE_PATH = './';

export class AbstractClientFileGenerator {
  public constructor(private readonly operations: OperationInfo[], private readonly typeResolver: TypeResolver) {}

  public generate(): GeneratorOutput {
    const output = new GeneratorOutput();

    const groupNames = [...new Set(this.operations.map((o) => o.groupName))];
    groupNames.sort();

    const operations = this.operations.map((operation) => {
      const resolvedResponseType = operation.response
        ? this.typeResolver.resolve(operation.response.descriptor, BASE_PATH)
        : null;

      const className = NameFormatter.getOperationClassName(operation.operationId);
      const responseTypeCodes = resolvedResponseType
        ? TypeCodesGenerator.generate(resolvedResponseType, true)
        : {
            colon: ':',
            typeCode: 'null',
            inputTypeCode: 'null',
            jsonTypeCode: 'null',
            complexType: null,
          };

      return {
        groupName: operation.groupName,
        className,
        resolvedResponseType,
        responseTypeCodes,
        parameterName: NameFormatter.getParameterName(NameFormatter.getClassName(TypeName.from(operation.operationId))),
      };
    });

    for (const operation of operations) {
      output.addImport(
        [operation.className, `${operation.className}Request`, `${operation.className}RequestJSON`],
        `./operations/${operation.className}`,
      );
      if (operation.resolvedResponseType && operation.resolvedResponseType.complexType) {
        const className = operation.resolvedResponseType.complexType.className;
        output.addImport([className, `${className}JSON`], operation.resolvedResponseType.complexType.importPath);
      }
    }
    output.commitImports();

    output.write(0, `export interface OperationV3<Request, RequestJSON, Response, ResponseJSON> {`);
    output.write(1, `operationId: string;`);
    output.write(1, `groupName: string;`);
    output.write(1, `httpMethod: string;`);
    output.write(1, `routePattern: string;`);
    output.write(1, `parameterNames: string[];`);
    output.write(1, `hasResponse: boolean;`);
    output.write(1, `hasBody: boolean;`);
    output.write(1, `serializeRequest?: (request: Request) => RequestJSON;`);
    output.write(1, `parseResponse?: (json: ResponseJSON) => Response;`);
    output.write(0, `}`);
    output.newLine();

    output.write(0, `export abstract class AbstractClient {`);
    output.write(
      1,
      `protected abstract createEndpoint<Request, RequestJSON, Response, ResponseJSON>(operation: OperationV3<Request, RequestJSON, Response, ResponseJSON>): (request: Request) => Promise<Response>;`,
    );
    output.newLine();

    for (const groupName of groupNames) {
      const safeGroupName = NameFormatter.getParameterName(groupName);
      const groupOperations = operations.filter((o) => o.groupName === groupName);

      output.write(1, `public readonly ${safeGroupName} = {`);
      for (const operation of groupOperations) {
        output.write(2, `${operation.parameterName}: this.createEndpoint<`);
        output.write(3, `${operation.className}Request,`);
        output.write(3, `${operation.className}RequestJSON,`);
        output.write(3, `${operation.responseTypeCodes.typeCode},`);
        output.write(3, `${operation.responseTypeCodes.jsonTypeCode}`);
        output.write(2, `>(${operation.className}),`);
      }
      output.write(1, '};');
    }

    output.write(0, '}');
    return output;
  }
}
