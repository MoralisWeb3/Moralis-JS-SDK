import { OperationInfo } from '../../reader/OpenApiReaderResult';
import { NameFormatter } from '../../reader/utils/NameFormatter';
import { GeneratorOutput } from '../GeneratorOutput';
import { Types, TypesGenerator } from './TypesGenerator';

export interface OperationFileGeneratorResult {
  className: string;
  output: GeneratorOutput;
}

export class OperationFileGenerator {
  public constructor(private readonly info: OperationInfo, private readonly typesGenerator: TypesGenerator) {}

  public generate(): OperationFileGeneratorResult {
    const returnTypes = this.info.response ? this.typesGenerator.generate(this.info.response.descriptor, true) : null;
    const bodyTypes = this.info.body
      ? this.typesGenerator.generate(this.info.body.descriptor, this.info.body.isRequired)
      : null;

    const normalizedOperationId = NameFormatter.normalize(this.info.operationId);
    const className = this.typesGenerator.createClassName(normalizedOperationId + 'Operation');
    const output = new GeneratorOutput();

    const parameters = this.info.parameters.map((parameter) => {
      const camelCasedName = NameFormatter.toCamelCase(parameter.name);
      const types = this.typesGenerator.generate(parameter.descriptor, parameter.isRequired);
      return {
        camelCasedName,
        types,
        parameter,
        input2TypeCode: this.typesGenerator.generateInput2TypeCode(
          parameter.descriptor,
          `request.${camelCasedName}`,
          parameter.isRequired,
        ),
        type2JSONCode: this.typesGenerator.generateType2JSONCode(
          parameter.descriptor,
          camelCasedName,
          parameter.isRequired,
        ),
      };
    });

    const imports = new Map<string, Types>();
    parameters.forEach((parameter) => {
      if (parameter.types.className) {
        imports.set(parameter.types.className, parameter.types);
      }
    });
    if (returnTypes?.className) {
      imports.set(returnTypes.className, returnTypes);
    }
    if (bodyTypes?.className) {
      imports.set(bodyTypes.className, bodyTypes);
    }

    if (imports.size > 0) {
      for (const types of imports.values()) {
        output.write(
          0,
          `import { ${types.className}, ${types.jsonClassName}, ${types.inputClassName} } from '../types/${types.className}';`,
        );
      }
      output.newLine();
    }

    output.write(0, `export interface ${className}RequestJSON {`);
    for (const p of parameters) {
      output.write(1, `readonly ${p.parameter.name}${p.types.colon} ${p.types.jsonTypeCode};`);
    }
    output.write(0, '}');
    output.newLine();

    output.write(0, `export interface ${className}Request {`);
    for (const p of parameters) {
      output.write(1, `readonly ${p.camelCasedName}${p.types.colon} ${p.types.inputTypeCode};`);
    }
    if (bodyTypes) {
      output.write(1, `readonly body${bodyTypes.colon} ${bodyTypes.inputTypeCode};`);
    }
    output.write(0, '}');
    output.newLine();

    if (this.info.description) {
      output.writeComment(0, null, {
        description: this.info.description,
      });
    }

    const parameterNames = parameters.map((p) => p.parameter.name);

    output.write(0, `export const ${className} = {`);
    output.write(1, `operationId: ${JSON.stringify(this.info.operationId)},`);
    output.write(1, `httpMethod: ${JSON.stringify(this.info.httpMethod)},`);
    output.write(1, `routePattern: ${JSON.stringify(this.info.routePattern)},`);
    output.write(1, `parameterNames: ${JSON.stringify(parameterNames)},`);
    output.write(1, `hasResponse: ${JSON.stringify(!!this.info.response)},`);
    output.write(1, `hasBody: ${JSON.stringify(!!this.info.body)},`);
    output.newLine();

    if (returnTypes && this.info.response) {
      const responseJSON2TypeCode = this.typesGenerator.generateJSON2TypeCode(
        this.info.response.descriptor,
        'json',
        true,
      );

      output.write(1, `parseResponse(json: ${returnTypes.jsonTypeCode}): ${returnTypes.typeCode} {`);
      output.write(2, `return ${responseJSON2TypeCode};`);
      output.write(1, '},');
      output.newLine();
    }

    output.write(1, `serializeRequest(request: ${className}Request): ${className}RequestJSON {`);
    for (const p of parameters) {
      output.write(2, `const ${p.camelCasedName} = ${p.input2TypeCode};`);
    }

    output.write(2, 'return {');
    for (const p of parameters) {
      output.write(3, `${p.parameter.name}: ${p.type2JSONCode},`);
    }
    output.write(2, '};');
    output.write(1, '},');
    output.newLine();

    if (bodyTypes && this.info.body) {
      const bodyInput2TypeCode = this.typesGenerator.generateInput2TypeCode(
        this.info.body.descriptor!,
        'request.body',
        this.info.body.isRequired,
      );
      const bodyType2JSONCode = this.typesGenerator.generateType2JSONCode(
        this.info.body.descriptor,
        `body`,
        this.info.body.isRequired,
      );
      const returnType = this.info.body.isRequired ? bodyTypes.jsonTypeCode : `${bodyTypes.jsonTypeCode} | undefined`;

      output.write(1, `serializeBody(request: ${className}Request): ${returnType} {`);
      output.write(2, `const body = ${bodyInput2TypeCode};`);
      output.write(2, `return ${bodyType2JSONCode};`);
      output.write(1, '},');
    }

    output.write(0, '}');

    return {
      output,
      className,
    };
  }
}
