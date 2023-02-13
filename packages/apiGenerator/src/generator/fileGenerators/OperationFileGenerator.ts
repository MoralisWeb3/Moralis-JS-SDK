import { OperationInfo } from '../../reader/OpenApiReaderResult';
import { NameFormatter } from './codeGenerators/NameFormatter';
import { Output } from '../output/Output';
import { ValueMappingCodeGenerator } from './codeGenerators/ValueMappingCodeGenerator';
import { TypeCodesGenerator } from './codeGenerators/TypeCodesGenerator';
import { TypeResolver } from './TypeResolver';
import { TypeScriptOutput } from '../output/TypeScriptOutput';

export interface OperationFileGeneratorResult {
  className: string;
  output: Output;
}

export class OperationFileGenerator {
  public constructor(private readonly info: OperationInfo, private readonly typeResolver: TypeResolver) {}

  public generate(): OperationFileGeneratorResult {
    const resolvedResponseType = this.info.response ? this.typeResolver.resolve(this.info.response.descriptor) : null;
    const responseTypeCodes = resolvedResponseType ? TypeCodesGenerator.generate(resolvedResponseType, true) : null;

    const resolvedBodyType = this.info.body ? this.typeResolver.resolve(this.info.body.descriptor) : null;
    const bodyTypeCodes =
      resolvedBodyType && this.info.body
        ? TypeCodesGenerator.generate(resolvedBodyType, this.info.body.isRequired)
        : null;

    const className = NameFormatter.getClassName(this.info.operationId) + 'Operation';
    const output = new TypeScriptOutput();

    const parameters = this.info.parameters.map((parameter) => {
      const camelCasedName = NameFormatter.getParameterName(parameter.name);
      const resolvedParamType = this.typeResolver.resolveForOperationParameter(parameter.descriptor, parameter.name);
      const types = TypeCodesGenerator.generate(resolvedParamType, parameter.isRequired);
      return {
        camelCasedName,
        types,
        parameter,
        input2TypeCode: ValueMappingCodeGenerator.generateInput2TypeCode(
          resolvedParamType,
          `request.${camelCasedName}`,
          parameter.isRequired,
        ),
        type2JSONCode: ValueMappingCodeGenerator.generateType2JSONCode(
          resolvedParamType,
          camelCasedName,
          parameter.isRequired,
        ),
      };
    });

    const parameterNames = parameters.map((p) => p.parameter.name);

    // view:

    parameters.forEach((parameter) => {
      if (parameter.types.referenceType) {
        output.addImport(
          [
            parameter.types.referenceType.className,
            parameter.types.referenceType.inputClassName,
            parameter.types.referenceType.jsonClassName,
          ],
          parameter.types.referenceType.importPath,
        );
      }
    });
    if (responseTypeCodes?.referenceType) {
      output.addImport(
        [responseTypeCodes.referenceType.className, responseTypeCodes.referenceType.jsonClassName],
        responseTypeCodes.referenceType.importPath,
      );
    }
    if (bodyTypeCodes?.referenceType) {
      output.addImport(
        [
          bodyTypeCodes.referenceType.className,
          bodyTypeCodes.referenceType.inputClassName,
          bodyTypeCodes.referenceType.jsonClassName,
        ],
        bodyTypeCodes.referenceType.importPath,
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
      output.write(1, `readonly ${p.camelCasedName}${p.types.colon} ${p.types.inputUnionTypeCode};`);
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
      const responseJSON2TypeCode = ValueMappingCodeGenerator.generateJSON2TypeCode(resolvedResponseType, 'json', true);

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
      const bodyInput2TypeCode = ValueMappingCodeGenerator.generateInput2TypeCode(
        resolvedBodyType,
        'body',
        this.info.body.isRequired,
      );
      const bodyType2JSONCode = ValueMappingCodeGenerator.generateType2JSONCode(
        resolvedBodyType,
        `value`,
        this.info.body.isRequired,
      );

      output.write(
        1,
        `serializeBody(body: ${bodyTypeCodes.inputUnionTypeCode}${bodyTypeCodes.undefinedSuffix}): ${bodyTypeCodes.jsonTypeCode}${bodyTypeCodes.undefinedSuffix} {`,
      );
      if (!this.info.body.isRequired) {
        output.write(1, 'if (!body) {');
        output.write(2, 'return undefined;');
        output.write(1, '}');
      }
      output.write(2, `const value = ${bodyInput2TypeCode};`);
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
