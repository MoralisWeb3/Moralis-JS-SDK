import { NameFormatter } from '../../reader/NameFormatter';
import { OperationInfo } from '../../reader/OpenApi3Reader';
import { GeneratorOutput } from '../GeneratorOutput';
import { TypeGenerator } from './TypeGenerator';

export interface OperationFileGeneratorResult {
  className: string;
  output: GeneratorOutput;
}

export class OperationFileGenerator {
  private readonly typeGenerator = new TypeGenerator(this.classNamePrefix);

  public constructor(private readonly info: OperationInfo, private readonly classNamePrefix: string) {}

  public generate(): OperationFileGeneratorResult {
    const returnTypeNames = this.typeGenerator.generateNames(this.info.returnType);

    const normalizedOperationId = NameFormatter.normalize(this.info.operationId);
    const className = NameFormatter.joinName(this.classNamePrefix, normalizedOperationId + 'Operation');
    const output = new GeneratorOutput();

    if (returnTypeNames.className && returnTypeNames.jsonClassName) {
      output.write(
        0,
        `import { ${returnTypeNames.className}, ${returnTypeNames.jsonClassName} } from '../types/${returnTypeNames.className}';`,
      );
      output.newLine();
    }

    output.write(0, `export const ${className} = {`);
    output.write(1, `operationId: ${JSON.stringify(this.info.operationId)},`);
    output.write(1, `httpMethod: ${JSON.stringify(this.info.httpMethod)},`);
    output.write(1, `routePattern: ${JSON.stringify(this.info.routePattern)},`);
    output.write(1, `parseResponse(json: ${returnTypeNames.jsonTypeCode}): ${returnTypeNames.typeCode} {`);
    output.write(2, `return ${this.typeGenerator.generateMappingCode(this.info.returnType, 'json')};`);
    output.write(1, '}');
    output.write(0, '}');

    return {
      output,
      className,
    };
  }
}
