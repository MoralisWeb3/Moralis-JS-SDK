import { OperationInfo } from '../../reader/OpenApiReaderResult';
import { NameFormatter } from './codeGenerators/NameFormatter';
import { GeneratorOutput } from '../GeneratorOutput';
import { MappingCodeGenerator } from './codeGenerators/MappingCodeGenerator';
import { TypeCodesGenerator } from './codeGenerators/TypeCodesGenerator';
import { TypeResolver } from './TypeResolver';

const BASE_PATH = '../';

export interface OperationFileGeneratorResult {
  className: string;
  output: GeneratorOutput;
}

export class OperationFileGenerator {
  public constructor(private readonly info: OperationInfo, private readonly typeResolver: TypeResolver) {}

  public generate(): OperationFileGeneratorResult {
    const resolvedResponseType = this.info.response
      ? this.typeResolver.resolve(this.info.response.descriptor, BASE_PATH)
      : null;
    const responseTypeCodes = resolvedResponseType ? TypeCodesGenerator.generate(resolvedResponseType, true) : null;

    const resolvedBodyType = this.info.body ? this.typeResolver.resolve(this.info.body.descriptor, BASE_PATH) : null;
    const bodyTypeCodes =
      resolvedBodyType && this.info.body
        ? TypeCodesGenerator.generate(resolvedBodyType, this.info.body.isRequired)
        : null;

    const className = NameFormatter.getOperationClassName(this.info.operationId);
    const output = new GeneratorOutput();

    const parameters = this.info.parameters.map((parameter) => {
      const camelCasedName = NameFormatter.getParameterName(parameter.name);
      const resolvedParamType = this.typeResolver.resolve(parameter.descriptor, BASE_PATH);
      const types = TypeCodesGenerator.generate(resolvedParamType, parameter.isRequired);
      return {
        camelCasedName,
        types,
        parameter,
        input2TypeCode: MappingCodeGenerator.generateInput2TypeCode(
          resolvedParamType,
          `request.${camelCasedName}`,
          parameter.isRequired,
        ),
        type2JSONCode: MappingCodeGenerator.generateType2JSONCode(
          resolvedParamType,
          camelCasedName,
          parameter.isRequired,
        ),
      };
    });

    parameters.forEach((parameter) => {
      if (parameter.types.complexType) {
        output.addImport(
          [
            parameter.types.complexType.className,
            parameter.types.complexType.inputClassName,
            parameter.types.complexType.jsonClassName,
          ],
          parameter.types.complexType.importPath,
        );
      }
    });
    if (responseTypeCodes?.complexType) {
      output.addImport(
        [responseTypeCodes.complexType.className, responseTypeCodes.complexType.jsonClassName],
        responseTypeCodes.complexType.importPath,
      );
    }
    if (bodyTypeCodes?.complexType) {
      output.addImport(
        [
          bodyTypeCodes.complexType.className,
          bodyTypeCodes.complexType.inputClassName,
          bodyTypeCodes.complexType.jsonClassName,
        ],
        bodyTypeCodes.complexType.importPath,
      );
    }
    output.commitImports();

    output.write(0, '// request parameters:');
    for (const p of parameters) {
      output.write(0, `// - ${p.parameter.name} ($ref: ${p.parameter.descriptor.ref})`);
    }
    output.newLine();

    output.write(0, `export interface ${className}Request {`);
    for (const p of parameters) {
      const paramTypeCode =
        p.types.inputTypeCode !== p.types.typeCode
          ? `${p.types.inputTypeCode} | ${p.types.typeCode}`
          : p.types.inputTypeCode;
      output.write(1, `readonly ${p.camelCasedName}${p.types.colon} ${paramTypeCode};`);
    }
    if (bodyTypeCodes) {
      output.write(1, `readonly body${bodyTypeCodes.colon} ${bodyTypeCodes.inputTypeCode};`);
    }
    output.write(0, '}');
    output.newLine();

    output.write(0, `export interface ${className}RequestJSON {`);
    for (const p of parameters) {
      output.write(1, `readonly ${p.parameter.name}${p.types.colon} ${p.types.jsonTypeCode};`);
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
    output.write(1, `groupName: ${JSON.stringify(this.info.groupName)},`);
    output.write(1, `httpMethod: ${JSON.stringify(this.info.httpMethod)},`);
    output.write(1, `routePattern: ${JSON.stringify(this.info.routePattern)},`);
    output.write(1, `parameterNames: ${JSON.stringify(parameterNames)},`);
    output.write(1, `hasResponse: ${JSON.stringify(!!this.info.response)},`);
    output.write(1, `hasBody: ${JSON.stringify(!!this.info.body)},`);
    output.newLine();

    if (resolvedResponseType && responseTypeCodes && this.info.response) {
      const responseJSON2TypeCode = MappingCodeGenerator.generateJSON2TypeCode(resolvedResponseType, 'json', true);

      output.write(1, `parseResponse(json: ${responseTypeCodes.jsonTypeCode}): ${responseTypeCodes.typeCode} {`);
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

    if (resolvedBodyType && bodyTypeCodes && this.info.body) {
      const bodyInput2TypeCode = MappingCodeGenerator.generateInput2TypeCode(
        resolvedBodyType,
        'request.body',
        this.info.body.isRequired,
      );
      const bodyType2JSONCode = MappingCodeGenerator.generateType2JSONCode(
        resolvedBodyType,
        `body`,
        this.info.body.isRequired,
      );
      const returnType = this.info.body.isRequired
        ? bodyTypeCodes.jsonTypeCode
        : `${bodyTypeCodes.jsonTypeCode} | undefined`;

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
