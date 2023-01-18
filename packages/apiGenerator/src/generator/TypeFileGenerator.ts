import { NameFormatter } from '../reader/NameFormatter';
import { TypeInfo } from '../reader/OpenApiReader';
import { GeneratorOutput } from './GeneratorOutput';
import { TypeGenerator } from './TypeGenerator';

export interface TypeClassGeneratorResult {
  className: string;
  output: GeneratorOutput;
}

export class TypeFileGenerator {
  private readonly typeGenerator = new TypeGenerator(this.classNamePrefix);

  public constructor(private readonly info: TypeInfo, private readonly classNamePrefix: string) {}

  public generate(): TypeClassGeneratorResult {
    const typeNames = this.typeGenerator.generateNames(this.info.type);
    const output = new GeneratorOutput();

    const properties = this.info.properties.map((property) => ({
      property,
      names: this.typeGenerator.generateNames(property.type),
    }));

    for (const p of properties) {
      if (p.names.className && p.names.jsonClassName) {
        output.write(0, `import { ${p.names.className}, ${p.names.jsonClassName} } from './${p.names.className}';`);
      }
    }
    output.newLine();

    output.write(0, `export interface ${typeNames.jsonClassName} {`);
    for (const p of properties) {
      output.write(1, `readonly ${p.property.name}: ${p.names.jsonTypeCode};`);
    }
    output.write(0, '}');
    output.newLine();

    output.write(0, `export class ${typeNames.className} {`);

    output.write(1, `public static create(input: ${typeNames.jsonClassName}) {`);
    output.write(2, `return new ${typeNames.className}(input);`);
    output.write(1, `}`);
    output.newLine();

    output.write(1, `private constructor(private readonly _json: ${typeNames.jsonClassName}) {}`);
    output.newLine();

    for (const p of properties) {
      const camelizedPropertyName = NameFormatter.toCamelCase(p.property.name);

      if (p.property.description) {
        output.write(1, '/**');
        output.write(1, ` * @description ${p.property.description}`);
        output.write(1, ' */');
      }

      output.write(1, `public get ${camelizedPropertyName}(): ${p.names.typeCode} {`);
      output.write(
        2,
        `return ${this.typeGenerator.generateMappingCode(p.property.type, 'this._json.' + p.property.name)};`,
      );
      output.write(1, '}');
    }
    output.write(0, `}`);

    return { output, className: typeNames.className as string };
  }
}
