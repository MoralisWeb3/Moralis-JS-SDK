import { OperationInfo } from 'src/reader/PathsReader';
import { NameFormatter } from '../../reader/utils/NameFormatter';
import { GeneratorOutput } from '../GeneratorOutput';
import { CodeGenerator } from './CodeGenerator';

export interface OperationFileGeneratorResult {
  className: string;
  output: GeneratorOutput;
}

export class OperationFileGenerator {
  private readonly codeGenerator = new CodeGenerator(this.classNamePrefix);

  public constructor(private readonly info: OperationInfo, private readonly classNamePrefix: string) {}

  public generate(): OperationFileGeneratorResult {
    const returnTypeNames = this.codeGenerator.generateNames(this.info.responseDescriptor);

    const normalizedOperationId = NameFormatter.normalize(this.info.operationId);
    const className = NameFormatter.joinName(this.classNamePrefix, normalizedOperationId + 'Operation');
    const output = new GeneratorOutput();

    const parameters = this.info.parameters.map((parameter) => {
      const camelCasedName = NameFormatter.toCamelCase(parameter.name);
      const names = this.codeGenerator.generateNames(parameter.descriptor);
      return {
        camelCasedName,
        names,
        parameter,
        importPath: `../types/${names.className}`,
      };
    });

    if (returnTypeNames.className && returnTypeNames.jsonClassName) {
      output.write(
        0,
        `import { ${returnTypeNames.className}, ${returnTypeNames.jsonClassName} } from '../types/${returnTypeNames.className}';`,
      );
    }
    for (const p of parameters) {
      if (p.names.className && p.names.jsonClassName) {
        output.write(0, `import { ${p.names.className}, ${p.names.jsonClassName} } from '${p.importPath}';`);
      }
    }
    output.newLine();

    output.write(0, `export interface ${className}RequestJSON {`);
    for (const p of parameters) {
      output.write(1, `readonly ${p.parameter.name}: ${p.names.jsonTypeCode};`);
    }
    output.write(0, '}');
    output.newLine();

    output.write(0, `export interface ${className}Request {`);
    for (const p of parameters) {
      output.write(1, `readonly ${p.camelCasedName}: ${p.names.typeCode};`);
    }
    output.write(0, '}');
    output.newLine();

    if (this.info.description) {
      output.writeComment(0, null, {
        description: this.info.description,
      });
    }
    output.write(0, `export const ${className} = {`);
    output.write(1, `operationId: ${JSON.stringify(this.info.operationId)},`);
    output.write(1, `httpMethod: ${JSON.stringify(this.info.httpMethod)},`);
    output.write(1, `routePattern: ${JSON.stringify(this.info.routePattern)},`);
    output.newLine();

    output.write(1, `parseResponse(json: ${returnTypeNames.jsonTypeCode}): ${returnTypeNames.typeCode} {`);
    output.write(2, `return ${this.codeGenerator.generateJSON2TypeCode(this.info.responseDescriptor, 'json')};`);
    output.write(1, '},');
    output.newLine();

    output.write(1, `serializeRequest(request: ${className}Request): ${className}RequestJSON {`);
    output.write(2, 'return {');
    for (const p of parameters) {
      output.write(
        3,
        `${p.parameter.name}: ${this.codeGenerator.generateType2JSONCode(
          p.parameter.descriptor,
          `request.${p.camelCasedName}`,
        )},`,
      );
    }
    output.write(2, '};');
    output.write(1, '},');

    output.write(0, '}');

    return {
      output,
      className,
    };
  }
}
