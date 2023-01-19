import { SimpleTypeInfo } from 'src/reader/OpenApi3Reader';
import { GeneratorOutput } from '../GeneratorOutput';
import { SimpleTypeNormalizer, TypeGenerator } from './TypeGenerator';

export interface SimpleTypeFileGeneratorResult {
  className: string;
  output: GeneratorOutput;
}

export class SimpleTypeFileGenerator {
  private readonly typeGenerator = new TypeGenerator(this.classNamePrefix);

  public constructor(private readonly info: SimpleTypeInfo, private readonly classNamePrefix: string) {}

  public generate(): SimpleTypeFileGeneratorResult {
    const typeNames = this.typeGenerator.generateNames(this.info.type);
    const output = new GeneratorOutput();

    const normalizedType = SimpleTypeNormalizer.normalize(this.info.simpleType);
    const typeSelector = TypeGenerator.toTypeSelector(
      normalizedType,
      this.info.type.isArray,
      this.info.type.isRequired,
    );

    output.write(0, `export type ${typeNames.jsonClassName} = ${typeSelector};`);
    output.newLine();

    output.write(0, `export class ${typeNames.className} {`);
    output.write(1, `public static create(json: ${typeNames.jsonClassName}) {`);
    output.write(2, `return new ${typeNames.className}(json);`);
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public constructor(public readonly value: ${typeSelector}) {}`);
    output.write(0, `}`);

    return { output, className: typeNames.className as string };
  }
}
