import { SimpleTypeInfo } from 'src/reader/OpenApiReaderResult';
import { GeneratorOutput } from '../GeneratorOutput';
import { TypeCodesGenerator } from './codeGenerators/TypeCodesGenerator';
import { SimpleTypeNormalizer } from './codeGenerators/SimpleTypeNormalizer';
import { TypeResolver } from './TypeResolver';

const BASE_PATH = '../';

export interface SimpleTypeFileGeneratorResult {
  className: string;
  output: GeneratorOutput;
}

export class SimpleTypeFileGenerator {
  public constructor(private readonly info: SimpleTypeInfo, private readonly typeResolver: TypeResolver) {}

  public generate(): SimpleTypeFileGeneratorResult {
    const resolvedType = this.typeResolver.resolveWithNoMapping(this.info.descriptor, BASE_PATH);
    const { complexType: complexTypeCodes } = TypeCodesGenerator.generate(resolvedType, true);
    if (!complexTypeCodes) {
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
    output.write(0, `// typeName: ${this.info.descriptor.typeName.toString()}`);
    output.newLine();

    output.write(0, `export type ${complexTypeCodes.jsonClassName} = ${typeCode};`);
    output.write(0, `export type ${complexTypeCodes.inputClassName} = ${complexTypeCodes.jsonClassName};`);
    output.newLine();

    output.write(0, `export class ${complexTypeCodes.className} {`);

    output.write(
      1,
      `public static create(input: ${complexTypeCodes.inputClassName} | ${complexTypeCodes.className}) {`,
    );
    output.write(2, `if (input instanceof ${complexTypeCodes.className}) {`);
    output.write(3, `return input;`);
    output.write(2, `}`);
    output.write(2, `return new ${complexTypeCodes.className}(input);`);
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public static fromJSON(json: ${complexTypeCodes.jsonClassName}) {`);
    output.write(2, `return new ${complexTypeCodes.className}(json);`);
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public constructor(public readonly value: ${complexTypeCodes.inputClassName}) {}`);
    output.newLine();

    output.write(1, `public toJSON(): ${complexTypeCodes.jsonClassName} {`);
    output.write(2, 'return this.value;');
    output.write(1, '}');

    output.write(0, `}`);

    return { output, className: complexTypeCodes.className as string };
  }
}
