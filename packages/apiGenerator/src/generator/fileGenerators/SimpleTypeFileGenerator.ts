import { SimpleTypeInfo } from 'src/reader/OpenApiReaderResult';
import { GeneratorOutput } from '../GeneratorOutput';
import { TypeCodesGenerator } from './codeGenerators/TypeCodesGenerator';
import { SimpleTypeNormalizer } from './codeGenerators/SimpleTypeNormalizer';
import { TypeResolver } from './TypeResolver';

export interface SimpleTypeFileGeneratorResult {
  className: string;
  output: GeneratorOutput;
}

export class SimpleTypeFileGenerator {
  public constructor(private readonly info: SimpleTypeInfo, private readonly typeResolver: TypeResolver) {}

  public generate(): SimpleTypeFileGeneratorResult {
    const resolvedType = this.typeResolver.resolve(this.info.descriptor);
    const typeCodes = TypeCodesGenerator.generate(resolvedType, true);
    if (!typeCodes.complexType) {
      throw new Error('Complex type is only supported');
    }

    const output = new GeneratorOutput();

    const normalizedType = SimpleTypeNormalizer.normalize(this.info.simpleType);
    let typeCode: string;
    if (this.info.enum) {
      typeCode = this.info.enum.map((value) => JSON.stringify(value)).join(' | ');
    } else {
      typeCode = TypeCodesGenerator.getTypeCode(normalizedType, this.info.descriptor.isArray);
    }

    output.write(0, `// $ref: ${this.info.descriptor.ref.toString()}`);
    output.newLine();

    output.write(0, `export type ${typeCodes.complexType.jsonClassName} = ${typeCode};`);
    output.write(0, `export type ${typeCodes.complexType.inputClassName} = ${typeCodes.complexType.jsonClassName};`);
    output.newLine();

    output.write(0, `export class ${typeCodes.complexType.className} {`);

    output.write(1, `public static create(input: ${typeCodes.complexType.inputClassName}) {`);
    output.write(2, `return new ${typeCodes.complexType.className}(input);`);
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public static fromJSON(json: ${typeCodes.complexType.jsonClassName}) {`);
    output.write(2, `return new ${typeCodes.complexType.className}(json);`);
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public constructor(public readonly value: ${typeCodes.complexType.inputClassName}) {}`);
    output.newLine();

    output.write(1, `public toJSON(): ${typeCodes.complexType.jsonClassName} {`);
    output.write(2, 'return this.value;');
    output.write(1, '}');

    output.write(0, `}`);

    return { output, className: typeCodes.complexType.className as string };
  }
}
