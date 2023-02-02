import { ComplexTypeInfo } from 'src/reader/OpenApiReaderResult';
import { Output } from '../output/Output';
import { ValueMappingCodeGenerator } from './codeGenerators/ValueMappingCodeGenerator';
import { TypeCodesGenerator } from './codeGenerators/TypeCodesGenerator';
import { TypeResolver } from './TypeResolver';
import { TypeScriptOutput } from '../output/TypeScriptOutput';
import { PropertyNameCodeGenerator } from './codeGenerators/PropertyNameCodeGenerator';

export interface TypeClassGeneratorResult {
  className: string;
  output: Output;
}

export class ComplexTypeFileGenerator {
  public constructor(private readonly info: ComplexTypeInfo, private readonly typeResolver: TypeResolver) {}

  public generate(): TypeClassGeneratorResult {
    if (this.info.descriptor.isArray) {
      throw new Error(`Array complex type is not supported yet (${this.info.descriptor.ref})`);
    }

    const resolvedType = this.typeResolver.resolveWithNoMapping(this.info.descriptor);
    const typeCodes = TypeCodesGenerator.generate(resolvedType, true);
    if (!typeCodes.complexType) {
      throw new Error('Invalid descriptor type');
    }

    const output = new TypeScriptOutput();

    const properties = this.info.properties.map((property) => {
      const resolvedPropertyType = this.typeResolver.resolveForComplexTypeProperty(property.descriptor, property.name);
      const propertyNameCodes = PropertyNameCodeGenerator.generate(property.name);
      return {
        property,
        propertyNameCodes,
        typeCodes: TypeCodesGenerator.generate(resolvedPropertyType, property.isRequired),
        json2TypeCode: ValueMappingCodeGenerator.generateJSON2TypeCode(
          resolvedPropertyType,
          `json${propertyNameCodes.accessCode}`,
          property.isRequired,
        ),
        type2jsonCode: ValueMappingCodeGenerator.generateType2JSONCode(
          resolvedPropertyType,
          `this${propertyNameCodes.camelCasedAccessCode}`,
          property.isRequired,
        ),
        input2typeCode: ValueMappingCodeGenerator.generateInput2TypeCode(
          resolvedPropertyType,
          `input${propertyNameCodes.camelCasedAccessCode}`,
          property.isRequired,
        ),
      };
    });

    // view:

    for (const p of properties) {
      if (!p.typeCodes.complexType) {
        continue;
      }
      if (p.typeCodes.complexType.className === typeCodes.complexType.className) {
        // Skips import to self type
        continue;
      }
      output.addImport(
        [
          p.typeCodes.complexType.className,
          p.typeCodes.complexType.inputClassName,
          p.typeCodes.complexType.jsonClassName,
        ],
        p.typeCodes.complexType.importPath,
      );
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
      output.write(1, `readonly ${p.propertyNameCodes.nameCode}${p.typeCodes.colon} ${p.typeCodes.jsonTypeCode};`);
    }
    output.write(0, '}');
    output.newLine();

    output.write(0, `export interface ${typeCodes.complexType.inputClassName} {`);
    for (const p of properties) {
      output.write(
        1,
        `readonly ${p.propertyNameCodes.camelCasedNameCode}${p.typeCodes.colon} ${p.typeCodes.inputUnionTypeCode};`,
      );
    }
    output.write(0, '}');
    output.newLine();

    output.write(0, `export class ${typeCodes.complexType.className} {`);

    output.write(
      1,
      `public static create(input: ${typeCodes.inputUnionTypeCode}): ${typeCodes.complexType.className} {`,
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
      output.write(3, `${p.propertyNameCodes.camelCasedNameCode}: ${p.json2TypeCode},`);
    }
    output.write(2, `};`);
    output.write(2, `return ${typeCodes.complexType.className}.create(input);`);
    output.write(1, `}`);
    output.newLine();

    for (const p of properties) {
      output.writeComment(1, null, {
        description: p.property.description,
      });
      output.write(
        1,
        `public readonly ${p.propertyNameCodes.camelCasedNameCode}${p.typeCodes.colon} ${p.typeCodes.typeCode};`,
      );
    }
    output.newLine();

    output.write(1, `private constructor(input: ${typeCodes.complexType.inputClassName}) {`);
    for (const p of properties) {
      output.write(2, `this${p.propertyNameCodes.camelCasedAccessCode} = ${p.input2typeCode};`);
    }
    output.write(1, '}');
    output.newLine();

    output.write(1, `public toJSON(): ${typeCodes.complexType.jsonClassName} {`);
    output.write(2, 'return {');
    for (const p of properties) {
      output.write(3, `${p.propertyNameCodes.nameCode}: ${p.type2jsonCode},`);
    }
    output.write(2, '}');
    output.write(1, '}');

    output.write(0, `}`);

    return { output, className: typeCodes.complexType.className as string };
  }
}
