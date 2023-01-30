import { ComplexTypeInfo } from 'src/reader/OpenApiReaderResult';
import { NameFormatter } from './codeGenerators/NameFormatter';
import { GeneratorOutput } from '../GeneratorOutput';
import { MappingCodeGenerator } from './codeGenerators/MappingCodeGenerator';
import { TypeCodesGenerator } from './codeGenerators/TypeCodesGenerator';
import { TypeResolver } from './TypeResolver';

export interface TypeClassGeneratorResult {
  className: string;
  output: GeneratorOutput;
}

const BASE_PATH = '../';

export class ComplexTypeFileGenerator {
  public constructor(private readonly info: ComplexTypeInfo, private readonly typeResolver: TypeResolver) {}

  public generate(): TypeClassGeneratorResult {
    if (this.info.descriptor.isArray) {
      throw new Error(`Array complex type is not supported yet (${this.info.descriptor.ref})`);
    }

    const resolvedType = this.typeResolver.resolveWithNoMapping(this.info.descriptor, BASE_PATH);
    const typeCodes = TypeCodesGenerator.generate(resolvedType, true);
    if (!typeCodes.complexType) {
      throw new Error('Invalid descriptor type');
    }

    const output = new GeneratorOutput();

    const properties = this.info.properties.map((property) => {
      const resolvedPropertyType = this.typeResolver.resolve(property.descriptor, BASE_PATH);
      const isSafe = isNameSafe(property.name);
      const nameCode = isSafe ? property.name : `'${property.name}'`;
      const camelCasedNameCode = isSafe ? NameFormatter.getParameterName(property.name) : `'${property.name}'`;
      const accessCode = isSafe ? `.${nameCode}` : `[${nameCode}]`;
      return {
        property,
        nameCode,
        accessCode,
        camelCasedNameCode,
        camelCasedAccessCode: isSafe ? `.${camelCasedNameCode}` : `[${camelCasedNameCode}]`,
        types: TypeCodesGenerator.generate(resolvedPropertyType, property.isRequired),
        json2TypeCode: MappingCodeGenerator.generateJSON2TypeCode(
          resolvedPropertyType,
          'json' + accessCode,
          property.isRequired,
        ),
        type2jsonCode: MappingCodeGenerator.generateType2JSONCode(
          resolvedPropertyType,
          'this.' + camelCasedNameCode,
          property.isRequired,
        ),
      };
    });

    for (const p of properties) {
      if (p.types.complexType) {
        if (p.types.complexType.className === typeCodes.complexType.className) {
          // Skips import to self type
          continue;
        }
        output.addImport(
          [p.types.complexType.className, p.types.complexType.jsonClassName],
          p.types.complexType.importPath,
        );
      }
    }
    output.commitImports();

    output.write(0, `// $ref: ${this.info.descriptor.ref.toString()}`);
    output.write(0, `// type: ${this.info.descriptor.typeName.toString()}`);
    output.write(0, `// properties:`);
    for (const p of properties) {
      output.write(0, `// - ${p.property.name} ($ref: ${p.property.descriptor.ref})`);
    }
    output.newLine();

    output.write(0, `export interface ${typeCodes.complexType.jsonClassName} {`);
    for (const p of properties) {
      output.write(1, `readonly ${p.nameCode}${p.types.colon} ${p.types.jsonTypeCode};`);
    }
    output.write(0, '}');
    output.newLine();

    output.write(0, `export interface ${typeCodes.complexType.inputClassName} {`);
    for (const p of properties) {
      output.write(1, `readonly ${p.camelCasedNameCode}${p.types.colon} ${p.types.typeCode};`);
    }
    output.write(0, '}');
    output.newLine();

    output.write(0, `export class ${typeCodes.complexType.className} {`);

    output.write(
      1,
      `public static create(input: ${typeCodes.complexType.inputClassName} | ${typeCodes.complexType.className}): ${typeCodes.complexType.className} {`,
    );
    output.write(2, `if (input instanceof ${typeCodes.complexType.className}) {`);
    output.write(3, `return input;`);
    output.write(2, `}`);
    output.write(2, `return new ${typeCodes.complexType.className}(input);`);
    output.write(1, '}');
    output.newLine();

    output.write(
      1,
      `public static fromJSON(json: ${typeCodes.complexType.jsonClassName}): ${typeCodes.complexType.className} {`,
    );
    output.write(2, `const input: ${typeCodes.complexType.inputClassName} = {`);
    for (const p of properties) {
      output.write(3, `${p.camelCasedNameCode}: ${p.json2TypeCode},`);
    }
    output.write(2, `};`);
    output.write(2, `return ${typeCodes.complexType.className}.create(input);`);
    output.write(1, `}`);
    output.newLine();

    for (const p of properties) {
      output.writeComment(1, null, {
        description: p.property.description,
      });
      output.write(1, `public readonly ${p.camelCasedNameCode}${p.types.colon} ${p.types.typeCode};`);
    }
    output.newLine();

    output.write(1, `private constructor(input: ${typeCodes.complexType.inputClassName}) {`);
    for (const p of properties) {
      output.write(2, `this${p.camelCasedAccessCode} = input${p.camelCasedAccessCode};`);
    }
    output.write(1, '}');
    output.newLine();

    output.write(1, `public toJSON(): ${typeCodes.complexType.jsonClassName} {`);
    output.write(2, 'return {');
    for (const p of properties) {
      output.write(3, `${p.nameCode}: ${p.type2jsonCode},`);
    }
    output.write(2, '}');
    output.write(1, '}');

    output.write(0, `}`);

    return { output, className: typeCodes.complexType.className as string };
  }
}

function isNameSafe(name: string): boolean {
  return /^[a-zA-Z_][a-zA-Z_0-9]*$/.test(name);
}
