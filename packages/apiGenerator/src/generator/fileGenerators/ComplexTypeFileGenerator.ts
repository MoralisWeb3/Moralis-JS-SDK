import { ComplexTypeInfo } from 'src/reader/OpenApi3Reader';
import { NameFormatter } from '../../reader/utils/NameFormatter';
import { GeneratorOutput } from '../GeneratorOutput';
import { CodeGenerator } from './CodeGenerator';

export interface TypeClassGeneratorResult {
  className: string;
  output: GeneratorOutput;
}

export class ComplexTypeFileGenerator {
  private readonly codeGenerator = new CodeGenerator(this.classNamePrefix);

  public constructor(private readonly info: ComplexTypeInfo, private readonly classNamePrefix: string) {}

  public generate(): TypeClassGeneratorResult {
    if (this.info.descriptor.isArray) {
      throw new Error(`Array complex type is not supported yet (${this.info.descriptor.ref})`);
    }

    const typeNames = this.codeGenerator.generateNames(this.info.descriptor, true);
    const output = new GeneratorOutput();

    const properties = this.info.properties.map((property) => {
      const isSafe = isNameSafe(property.name);
      const nameCode = isSafe ? property.name : `'${property.name}'`;
      const camelCasedNameCode = isSafe ? NameFormatter.toCamelCase(property.name) : `'${property.name}'`;
      return {
        property,
        nameCode: nameCode,
        accessCode: isSafe ? `.${nameCode}` : `[${nameCode}]`,
        camelCasedNameCode,
        camelCasedAccessCode: isSafe ? `.${camelCasedNameCode}` : `[${camelCasedNameCode}]`,
        names: this.codeGenerator.generateNames(property.descriptor, property.isRequired),
      };
    });

    for (const p of properties) {
      if (p.names.className === typeNames.className) {
        // Skips import to self type
        continue;
      }
      if (p.names.className && p.names.jsonClassName) {
        output.write(0, `import { ${p.names.className}, ${p.names.jsonClassName} } from './${p.names.className}';`);
      }
    }
    output.newLine();

    output.write(0, `// ref: ${this.info.descriptor.ref}`);
    output.newLine();

    output.write(0, `export interface ${typeNames.jsonClassName} {`);
    for (const p of properties) {
      output.write(1, `readonly ${p.nameCode}: ${p.names.jsonTypeCode};`);
    }
    output.write(0, '}');
    output.newLine();

    output.write(0, `export class ${typeNames.className} {`);
    output.write(1, `public static create(json: ${typeNames.jsonClassName}): ${typeNames.className} {`);
    output.write(2, `return new ${typeNames.className}(json);`);
    output.write(1, `}`);
    output.newLine();

    for (const p of properties) {
      output.writeComment(1, null, {
        description: p.property.description,
      });
      output.write(1, `public readonly ${p.camelCasedNameCode}: ${p.names.typeCode};`);
    }
    output.newLine();

    output.write(1, `private constructor(private readonly _json: ${typeNames.jsonClassName}) {`);
    for (const p of properties) {
      const mappingCode = this.codeGenerator.generateJSON2TypeCode(
        p.property.descriptor,
        '_json' + p.accessCode,
        p.property.isRequired,
      );
      output.write(2, `this${p.camelCasedAccessCode} = ${mappingCode};`);
    }
    output.write(1, '}');
    output.newLine();

    output.write(1, `public toJSON(): ${typeNames.jsonClassName} {`);
    output.write(2, 'return this._json;');
    output.write(1, '}');

    output.write(0, `}`);

    return { output, className: typeNames.className as string };
  }
}

function isNameSafe(name: string): boolean {
  return /^[a-zA-Z_][a-zA-Z_0-9]*$/.test(name);
}
