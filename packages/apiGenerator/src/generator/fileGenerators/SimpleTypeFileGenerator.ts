import { SimpleTypeInfo } from 'src/reader/OpenApiContract';
import { Output } from '../output/Output';
import { TypeCodesGenerator } from './codeGenerators/TypeCodesGenerator';
import { NativeTypeNormalizer } from './codeGenerators/NativeTypeNormalizer';
import { TypeResolver } from './resolvers/TypeResolver';
import { TypeScriptOutput } from '../output/TypeScriptOutput';

export interface SimpleTypeFileGeneratorResult {
  className: string;
  output: Output;
}

export class SimpleTypeFileGenerator {
  public constructor(private readonly info: SimpleTypeInfo, private readonly typeResolver: TypeResolver) {}

  public generate(): SimpleTypeFileGeneratorResult {
    const resolvedType = this.typeResolver.resolveWithNoMapping(this.info.descriptor);
    const { referenceType: referenceTypeCodes, inputOrValueTypeCode: inputOrValueTypeCode } =
      TypeCodesGenerator.generate(resolvedType, true);
    if (!referenceTypeCodes) {
      throw new Error('Complex type is only supported');
    }

    const normalizedNativeType = NativeTypeNormalizer.normalize(this.info.nativeType);
    let typeCode: string;
    if (this.info.enum) {
      typeCode = this.info.enum.map((value) => JSON.stringify(value)).join(' | ');
    } else {
      typeCode = TypeCodesGenerator.getTypeCode(normalizedNativeType, this.info.descriptor.isArray);
    }

    // view:

    const output = new TypeScriptOutput();

    output.write(0, `// $ref: ${this.info.descriptor.ref.toString()}`);
    output.write(0, `// typeName: ${this.info.descriptor.typeName.toString()}`);
    output.newLine();

    output.write(0, `export type ${referenceTypeCodes.jsonClassName} = ${typeCode};`);
    output.write(0, `export type ${referenceTypeCodes.inputClassName} = ${typeCode};`);
    output.write(0, `export type ${referenceTypeCodes.valueClassName} = ${typeCode};`);
    output.newLine();

    output.write(0, `export abstract class ${referenceTypeCodes.factoryClassName} {`);

    output.write(1, `public static create(input: ${inputOrValueTypeCode}): ${referenceTypeCodes.valueClassName} {`);
    output.write(2, `return input;`);
    output.write(1, `}`);
    output.newLine();

    output.write(
      1,
      `public static fromJSON(json: ${referenceTypeCodes.jsonClassName}): ${referenceTypeCodes.valueClassName} {`,
    );
    output.write(2, `return json;`);
    output.write(1, `}`);

    output.write(0, `}`);

    return { output, className: referenceTypeCodes.factoryClassName as string };
  }
}
