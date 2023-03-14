import { ComplexTypeInfo } from 'src/reader/OpenApiContract';
import { Output } from '../output/Output';
import { ValueMappingCodeGenerator } from './codeGenerators/ValueMappingCodeGenerator';
import { TypeCodesGenerator } from './codeGenerators/TypeCodesGenerator';
import { TypeScriptOutput } from '../output/TypeScriptOutput';
import { PropertyNameCodeGenerator } from './codeGenerators/PropertyNameCodeGenerator';
import { TypeDeterminantResolver } from './resolvers/TypeDeterminantResolver';
import { TypeInfoResolver } from './resolvers/TypeInfoResolver';
import { TypeResolver } from './resolvers/TypeResolver';

export interface TypeClassGeneratorResult {
  className: string;
  output: Output;
}

export class ComplexTypeFileGenerator {
  public constructor(
    private readonly info: ComplexTypeInfo,
    private readonly typeResolver: TypeResolver,
    private readonly typeDeterminantResolver: TypeDeterminantResolver,
    private readonly typeInfoResolver: TypeInfoResolver,
  ) {}

  public generate(): TypeClassGeneratorResult {
    if (this.info.descriptor.isArray) {
      throw new Error(`Array complex type is not supported yet (${this.info.descriptor.ref})`);
    }

    const resolvedType = this.typeResolver.resolveWithNoMapping(this.info.descriptor);
    const typeCodes = TypeCodesGenerator.generate(resolvedType, true);
    if (!typeCodes.referenceType) {
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

    const customTypeDeterminant = this.typeDeterminantResolver.tryResolve(this.info.descriptor.typeName);
    const requiredInputFieldNames = properties
      .filter((property) => property.property.isRequired)
      .map((property) => property.propertyNameCodes.camelCasedNameCode);
    const requiredJSONFieldNames = properties
      .filter((property) => property.property.isRequired)
      .map((property) => property.propertyNameCodes.nameCode);

    const isUsedByUnions = this.typeInfoResolver.isUsedByUnions(this.info.descriptor);

    // view:

    for (const p of properties) {
      if (!p.typeCodes.referenceType) {
        continue;
      }
      if (p.typeCodes.referenceType.factoryClassName === typeCodes.referenceType.factoryClassName) {
        // Skips import to self type
        continue;
      }
      output.addImport(
        [
          p.typeCodes.referenceType.factoryClassName,
          p.typeCodes.referenceType.valueClassName,
          p.typeCodes.referenceType.inputClassName,
          p.typeCodes.referenceType.jsonClassName,
        ],
        p.typeCodes.referenceType.importPath,
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

    output.write(0, `export interface ${typeCodes.referenceType.jsonClassName} {`);
    for (const p of properties) {
      output.write(1, `readonly ${p.propertyNameCodes.nameCode}${p.typeCodes.colon} ${p.typeCodes.jsonTypeCode};`);
    }
    output.write(0, '}');
    output.newLine();

    output.write(0, `export interface ${typeCodes.referenceType.inputClassName} {`);
    for (const p of properties) {
      output.write(
        1,
        `readonly ${p.propertyNameCodes.camelCasedNameCode}${p.typeCodes.colon} ${p.typeCodes.inputOrValueTypeCode};`,
      );
    }
    output.write(0, '}');
    output.newLine();

    output.write(0, `export class ${typeCodes.referenceType.factoryClassName} {`);

    output.write(
      1,
      `public static create(input: ${typeCodes.inputOrValueTypeCode}): ${typeCodes.referenceType.factoryClassName} {`,
    );
    output.write(2, `if (input instanceof ${typeCodes.referenceType.factoryClassName}) {`);
    output.write(3, `return input;`);
    output.write(2, `}`);
    output.write(2, `return new ${typeCodes.referenceType.factoryClassName}(input);`);
    output.write(1, '}');
    output.newLine();

    output.write(
      1,
      `public static fromJSON(json: ${typeCodes.referenceType.jsonClassName}): ${typeCodes.referenceType.factoryClassName} {`,
    );
    output.write(2, `const input: ${typeCodes.referenceType.inputClassName} = {`);
    for (const p of properties) {
      output.write(3, `${p.propertyNameCodes.camelCasedNameCode}: ${p.json2TypeCode},`);
    }
    output.write(2, `};`);
    output.write(2, `return ${typeCodes.referenceType.factoryClassName}.create(input);`);
    output.write(1, `}`);
    output.newLine();

    if (isUsedByUnions) {
      output.write(1, `public static isInput(input: any): input is ${typeCodes.referenceType.inputClassName} {`);
      if (customTypeDeterminant) {
        output.write(2, `return ${customTypeDeterminant.isInputCode};`);
      } else {
        output.write(
          2,
          `return ${JSON.stringify(requiredInputFieldNames)}.every((name) => input[name] !== undefined);`,
        );
      }
      output.write(1, `}`);
      output.newLine();

      output.write(1, `public static isJSON(json: any): json is ${typeCodes.referenceType.jsonClassName} {`);
      if (customTypeDeterminant) {
        output.write(2, `return ${customTypeDeterminant.isJSONCode};`);
      } else {
        output.write(2, `return ${JSON.stringify(requiredJSONFieldNames)}.every((name) => json[name] !== undefined);`);
      }
      output.write(1, `}`);
      output.newLine();
    }

    for (const p of properties) {
      output.writeComment(1, null, {
        description: p.property.description,
      });
      output.write(
        1,
        `public readonly ${p.propertyNameCodes.camelCasedNameCode}${p.typeCodes.colon} ${p.typeCodes.valueTypeCode};`,
      );
    }
    output.newLine();

    output.write(1, `private constructor(input: ${typeCodes.referenceType.inputClassName}) {`);
    for (const p of properties) {
      output.write(2, `this${p.propertyNameCodes.camelCasedAccessCode} = ${p.input2typeCode};`);
    }
    output.write(1, '}');
    output.newLine();

    output.write(1, `public toJSON(): ${typeCodes.referenceType.jsonClassName} {`);
    output.write(2, 'return {');
    for (const p of properties) {
      output.write(3, `${p.propertyNameCodes.nameCode}: ${p.type2jsonCode},`);
    }
    output.write(2, '}');
    output.write(1, '}');

    output.write(0, `}`);

    return { output, className: typeCodes.referenceType.factoryClassName as string };
  }
}
