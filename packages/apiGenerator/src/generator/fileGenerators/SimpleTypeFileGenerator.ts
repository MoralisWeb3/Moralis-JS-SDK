import { SimpleTypeInfo } from 'src/reader/ComplexTypesReader';
import { GeneratorOutput } from '../GeneratorOutput';
import { CodeGenerator } from './CodeGenerator';
import { SimpleTypeNormalizer } from './SimpleTypeNormalizer';

export interface SimpleTypeFileGeneratorResult {
  className: string;
  output: GeneratorOutput;
}

export class SimpleTypeFileGenerator {
  private readonly codeGenerator = new CodeGenerator(this.classNamePrefix);

  public constructor(private readonly info: SimpleTypeInfo, private readonly classNamePrefix: string) {}

  public generate(): SimpleTypeFileGeneratorResult {
    const typeNames = this.codeGenerator.generateNames(this.info.descriptor);
    const output = new GeneratorOutput();

    const normalizedType = SimpleTypeNormalizer.normalize(this.info.simpleType);
    const typeSelector = CodeGenerator.toTypeSelector(
      normalizedType,
      this.info.descriptor.isArray,
      this.info.descriptor.isRequired,
    );

    output.write(0, `export type ${typeNames.jsonClassName} = ${typeSelector};`);
    output.newLine();

    output.write(0, `export class ${typeNames.className} {`);
    output.write(1, `public static create(json: ${typeNames.jsonClassName}) {`);
    output.write(2, `return new ${typeNames.className}(json);`);
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public constructor(public readonly value: ${typeSelector}) {}`);
    output.newLine();

    output.write(1, `public toJSON(): ${typeNames.jsonClassName} {`);
    output.write(2, 'return this.value;');
    output.write(1, '}');

    output.write(0, `}`);

    return { output, className: typeNames.className as string };
  }
}
