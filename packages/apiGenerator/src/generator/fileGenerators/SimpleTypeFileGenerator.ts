import { SimpleTypeInfo } from 'src/reader/OpenApiReaderResult';
import { GeneratorOutput } from '../GeneratorOutput';
import { TypesGenerator } from './TypesGenerator';
import { SimpleTypeNormalizer } from './SimpleTypeNormalizer';

export interface SimpleTypeFileGeneratorResult {
  className: string;
  output: GeneratorOutput;
}

export class SimpleTypeFileGenerator {
  public constructor(private readonly info: SimpleTypeInfo, private readonly typesGenerator: TypesGenerator) {}

  public generate(): SimpleTypeFileGeneratorResult {
    const types = this.typesGenerator.generate(this.info.descriptor, true);
    const output = new GeneratorOutput();

    const normalizedType = SimpleTypeNormalizer.normalize(this.info.simpleType);
    let typeCode: string;
    if (this.info.enum) {
      typeCode = this.info.enum.map((value) => JSON.stringify(value)).join(' | ');
    } else {
      typeCode = TypesGenerator.toTypeCode(normalizedType, this.info.descriptor.isArray);
    }

    output.write(0, `// $ref: ${this.info.descriptor.ref.toString()}`);
    output.newLine();

    output.write(0, `export type ${types.jsonClassName} = ${typeCode};`);
    output.write(0, `export type ${types.inputClassName} = ${types.jsonClassName};`);
    output.newLine();

    output.write(0, `export class ${types.className} {`);

    output.write(1, `public static create(input: ${types.inputClassName}) {`);
    output.write(2, `return new ${types.className}(input);`);
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public static fromJSON(json: ${types.jsonClassName}) {`);
    output.write(2, `return new ${types.className}(json);`);
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public constructor(public readonly value: ${types.inputClassName}) {}`);
    output.newLine();

    output.write(1, `public toJSON(): ${types.jsonClassName} {`);
    output.write(2, 'return this.value;');
    output.write(1, '}');

    output.write(0, `}`);

    return { output, className: types.className as string };
  }
}
