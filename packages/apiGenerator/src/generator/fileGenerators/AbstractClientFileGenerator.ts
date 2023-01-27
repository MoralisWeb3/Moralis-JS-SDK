import { OperationInfo } from '../../reader/OpenApiReaderResult';
import { NameFormatter } from './codeGenerators/NameFormatter';
import { GeneratorOutput } from '../GeneratorOutput';
import { TypeName } from '../../reader/utils/TypeName';
import { ResolvedComplexType, TypeResolver } from './TypeResolver';

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

      let responseComplexType: ResolvedComplexType | null = null;
      let responseTypeCode: string;
      if (resolvedResponseType && resolvedResponseType.complexType) {
        responseComplexType = resolvedResponseType.complexType;
        responseTypeCode = resolvedResponseType.complexType.className;
      } else {
        responseTypeCode = resolvedResponseType?.simpleType || 'null';
      }

      return {
        groupName: operation.groupName,
        className,
        responseComplexType,
        responseTypeCode,
        parameterName: NameFormatter.getParameterName(NameFormatter.getClassName(TypeName.from(operation.operationId))),
      };
    });

    for (const operation of operations) {
      output.addImport([operation.className, operation.className + 'Request'], `./operations/${operation.className}`);
      if (operation.responseComplexType) {
        output.addImport([operation.responseComplexType.className], operation.responseComplexType.importPath);
      }
    }
    output.commitImports();
    output.newLine();

    output.write(0, `export abstract class AbstractClient {`);
    output.write(
      1,
      `protected abstract createEndpoint<Request, Response>(operation: any): (request: Request) => Promise<Response>;`,
    );
    output.newLine();

    for (const groupName of groupNames) {
      const safeGroupName = NameFormatter.getParameterName(groupName);
      const groupOperations = operations.filter((o) => o.groupName === groupName);

      output.write(1, `public readonly ${safeGroupName} = {`);
      for (const operation of groupOperations) {
        output.write(
          2,
          `${operation.parameterName}: this.createEndpoint<${operation.className}Request, ${operation.responseTypeCode}>(${operation.className}),`,
        );
      }
      output.write(1, '};');
    }

    output.write(0, '}');

    return output;
  }
}
