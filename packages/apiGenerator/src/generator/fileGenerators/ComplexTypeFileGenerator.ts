import { ComplexTypeInfo } from 'src/reader/OpenApiReaderResult';
import { NameFormatter } from '../../reader/utils/NameFormatter';
import { GeneratorOutput } from '../GeneratorOutput';
import { TypesGenerator } from './TypesGenerator';

export interface TypeClassGeneratorResult {
  className: string;
  output: GeneratorOutput;
}

export class ComplexTypeFileGenerator {
  public constructor(private readonly info: ComplexTypeInfo, private readonly typesGenerator: TypesGenerator) {}

  public generate(): TypeClassGeneratorResult {
    if (this.info.descriptor.isArray) {
      throw new Error(`Array complex type is not supported yet (${this.info.descriptor.ref})`);
    }

    const types = this.typesGenerator.generate(this.info.descriptor, true);
    const output = new GeneratorOutput();

    const properties = this.info.properties.map((property) => {
      const isSafe = isNameSafe(property.name);
      const nameCode = isSafe ? property.name : `'${property.name}'`;
      const camelCasedNameCode = isSafe ? NameFormatter.toCamelCase(property.name) : `'${property.name}'`;
      const accessCode = isSafe ? `.${nameCode}` : `[${nameCode}]`;
      return {
        property,
        nameCode,
        accessCode,
        camelCasedNameCode,
        camelCasedAccessCode: isSafe ? `.${camelCasedNameCode}` : `[${camelCasedNameCode}]`,
        types: this.typesGenerator.generate(property.descriptor, property.isRequired),
        json2TypeCode: this.typesGenerator.generateJSON2TypeCode(
          property.descriptor,
          'json' + accessCode,
          property.isRequired,
        ),
        type2jsonCode: this.typesGenerator.generateType2JSONCode(
          property.descriptor,
          'this.' + camelCasedNameCode,
          property.isRequired,
        ),
      };
    });

    for (const p of properties) {
      if (p.types.className === types.className) {
        // Skips import to self type
        continue;
      }
      if (p.types.className && p.types.jsonClassName) {
        output.write(0, `import { ${p.types.className}, ${p.types.jsonClassName} } from './${p.types.className}';`);
      }
    }
    output.newLine();

    output.write(0, `// $ref: ${this.info.descriptor.ref.toString()}`);
    output.newLine();

    output.write(0, `export interface ${types.jsonClassName} {`);
    for (const p of properties) {
      output.write(1, `readonly ${p.nameCode}${p.types.colon} ${p.types.jsonTypeCode};`);
    }
    output.write(0, '}');
    output.newLine();

    output.write(0, `export interface ${types.inputClassName} {`);
    for (const p of properties) {
      output.write(1, `readonly ${p.camelCasedNameCode}${p.types.colon} ${p.types.typeCode};`);
    }
    output.write(0, '}');
    output.newLine();

    output.write(0, `export class ${types.className} {`);

    output.write(1, `public static create(input: ${types.inputClassName}): ${types.className} {`);
    output.write(2, `return new ${types.className}(input);`);
    output.write(1, '}');
    output.newLine();

    output.write(1, `public static fromJSON(json: ${types.jsonClassName}): ${types.className} {`);
    output.write(2, `const input: ${types.inputClassName} = {`);
    for (const p of properties) {
      output.write(3, `${p.camelCasedNameCode}: ${p.json2TypeCode},`);
    }
    output.write(2, `};`);
    output.write(2, `return ${types.className}.create(input);`);
    output.write(1, `}`);
    output.newLine();

    for (const p of properties) {
      output.writeComment(1, null, {
        description: p.property.description,
      });
      output.write(1, `public readonly ${p.camelCasedNameCode}${p.types.colon} ${p.types.typeCode};`);
    }
    output.newLine();

    output.write(1, `private constructor(input: ${types.inputClassName}) {`);
    for (const p of properties) {
      output.write(2, `this${p.camelCasedAccessCode} = input${p.camelCasedAccessCode};`);
    }
    output.write(1, '}');
    output.newLine();

    output.write(1, `public toJSON(): ${types.jsonClassName} {`);
    output.write(2, 'return {');
    for (const p of properties) {
      output.write(3, `${p.nameCode}: ${p.type2jsonCode},`);
    }
    output.write(2, '}');
    output.write(1, '}');

    output.write(0, `}`);

    return { output, className: types.className as string };
  }
}

function isNameSafe(name: string): boolean {
  return /^[a-zA-Z_][a-zA-Z_0-9]*$/.test(name);
}
