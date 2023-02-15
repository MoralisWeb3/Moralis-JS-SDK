import { SimpleTypeInfo } from 'src/reader/OpenApiReaderResult';
import { Output } from '../output/Output';
import { TypeCodesGenerator } from './codeGenerators/TypeCodesGenerator';
import { SimpleTypeNormalizer } from './codeGenerators/SimpleTypeNormalizer';
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
    const { referenceType: referenceTypeCodes, inputUnionTypeCode } = TypeCodesGenerator.generate(resolvedType, true);
    if (!referenceTypeCodes) {
      throw new Error('Complex type is only supported');
    }

    const normalizedType = SimpleTypeNormalizer.normalize(this.info.simpleType);
    let typeCode: string;
    if (this.info.enum) {
      typeCode = this.info.enum.map((value) => JSON.stringify(value)).join(' | ');
    } else {
      typeCode = TypeCodesGenerator.getTypeCode(normalizedType, this.info.descriptor.isArray);
    }

    // view:

    const output = new TypeScriptOutput();

    output.write(0, `// $ref: ${this.info.descriptor.ref.toString()}`);
    output.write(0, `// typeName: ${this.info.descriptor.typeName.toString()}`);
    output.newLine();

    output.write(0, `export type ${referenceTypeCodes.jsonClassName} = ${typeCode};`);
    output.write(0, `export type ${referenceTypeCodes.inputClassName} = ${referenceTypeCodes.jsonClassName};`);
    output.newLine();

    output.write(0, `export class ${referenceTypeCodes.className} {`);

    output.write(1, `public static create(input: ${inputUnionTypeCode}) {`);
    output.write(2, `if (input instanceof ${referenceTypeCodes.className}) {`);
    output.write(3, `return input;`);
    output.write(2, `}`);
    output.write(2, `return new ${referenceTypeCodes.className}(input);`);
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public static fromJSON(json: ${referenceTypeCodes.jsonClassName}) {`);
    output.write(2, `return new ${referenceTypeCodes.className}(json);`);
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public constructor(public readonly value: ${referenceTypeCodes.inputClassName}) {}`);
    output.newLine();

    output.write(1, `public toJSON(): ${referenceTypeCodes.jsonClassName} {`);
    output.write(2, 'return this.value;');
    output.write(1, '}');

    output.write(0, `}`);

    return { output, className: referenceTypeCodes.className as string };
  }
}
