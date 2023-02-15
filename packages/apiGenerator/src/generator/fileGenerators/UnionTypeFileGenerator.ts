import { UnionTypeInfo } from '../../reader/OpenApiReaderResult';
import { Output } from '../output/Output';
import { TypeCodesGenerator } from './codeGenerators/TypeCodesGenerator';
import { TypeResolver } from './resolvers/TypeResolver';
import { TypeScriptOutput } from '../output/TypeScriptOutput';
import { UnionType } from '../../reader/TypeDescriptor';

export interface UnionTypeFileGeneratorResult {
  className: string;
  output: Output;
}

export class UnionTypeFileGenerator {
  public constructor(private readonly info: UnionTypeInfo, private readonly typeResolver: TypeResolver) {}

  public generate(): UnionTypeFileGeneratorResult {
    if (this.info.descriptor.unionType === UnionType.allOf) {
      throw new Error(`Generator doesn't support allOf union type`);
    }

    const resolvedType = this.typeResolver.resolveWithNoMapping(this.info.descriptor);
    const { referenceType: typeCodes, inputUnionTypeCode } = TypeCodesGenerator.generate(resolvedType, true);
    if (!typeCodes) {
      throw new Error('Reference type is only supported');
    }

    const unionTypes = this.info.unionDescriptors.map((descriptor) => {
      const unionResolvedType = this.typeResolver.resolveWithNoMapping(descriptor);
      return {
        typeCodes: TypeCodesGenerator.generate(unionResolvedType, true),
      };
    });

    const unionJsonTypeCode = unionTypes.map((unionType) => unionType.typeCodes.jsonTypeCode).join(' | ');
    const unionInputTypeCode = unionTypes.map((unionType) => unionType.typeCodes.inputTypeCode).join(' | ');
    const unionValueTypeCode = unionTypes.map((unionType) => unionType.typeCodes.typeCode).join(' | ');
    const hasAnySimpleType = unionTypes.some((unionType) => !unionType.typeCodes.referenceType);

    // view:

    const output = new TypeScriptOutput();

    for (const unionType of unionTypes) {
      if (unionType.typeCodes.referenceType) {
        output.addImport(
          [
            unionType.typeCodes.referenceType.className,
            unionType.typeCodes.referenceType.jsonClassName,
            unionType.typeCodes.referenceType.inputClassName,
          ],
          unionType.typeCodes.referenceType.importPath,
        );
      }
    }
    output.commitImports();

    output.write(0, `// $ref: ${this.info.descriptor.ref.toString()}`);
    output.write(0, `// typeName: ${this.info.descriptor.typeName.toString()}`);
    output.write(0, `// unionType: ${this.info.descriptor.unionType}`);
    output.newLine();

    output.write(0, `export type ${typeCodes.jsonClassName} = ${unionJsonTypeCode};`);
    output.write(0, `export type ${typeCodes.inputClassName} = ${unionInputTypeCode};`);
    output.newLine();

    output.write(0, `export class ${typeCodes.className} {`);

    output.write(1, `public static create(input: ${inputUnionTypeCode}): ${typeCodes.className} {`);
    output.write(2, `if (input instanceof ${typeCodes.className}) {`);
    output.write(3, `return input;`);
    output.write(2, `}`);

    for (const unionType of unionTypes) {
      if (!unionType.typeCodes.referenceType) {
        continue;
      }
      output.write(2, `if (${unionType.typeCodes.referenceType.className}.isInput(input)) {`);
      output.write(
        3,
        `return new ${typeCodes.className}(${unionType.typeCodes.referenceType.className}.create(input));`,
      );
      output.write(2, '}');
    }

    if (hasAnySimpleType) {
      output.write(2, `return new ${typeCodes.className}(input);`);
    } else {
      output.write(2, `throw new Error('Invalid input');`);
    }
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public static fromJSON(json: ${typeCodes.jsonClassName}): ${typeCodes.className} {`);
    for (const unionType of unionTypes) {
      if (!unionType.typeCodes.referenceType) {
        continue;
      }
      output.write(2, `if (${unionType.typeCodes.referenceType.className}.isJSON(json)) {`);
      output.write(
        3,
        `return new ${typeCodes.className}(${unionType.typeCodes.referenceType.className}.fromJSON(json));`,
      );
      output.write(2, '}');
    }

    if (hasAnySimpleType) {
      output.write(2, `return new ${typeCodes.className}(json);`);
    } else {
      output.write(
        2,
        `throw new Error(\`Cannot resolve union for ${typeCodes.className} (keys: \${Object.keys(json).join(',') })\`);`,
      );
    }
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public constructor(public readonly value: ${unionValueTypeCode}) {}`);
    output.newLine();

    output.write(1, `public toJSON(): ${typeCodes.jsonClassName} {`);
    for (const unionType of unionTypes) {
      if (!unionType.typeCodes.referenceType) {
        continue;
      }
      output.write(2, `if (this.value instanceof ${unionType.typeCodes.referenceType.className}) {`);
      output.write(3, `return this.value.toJSON();`);
      output.write(2, '}');
    }

    if (hasAnySimpleType) {
      output.write(2, `return this.value;`);
    } else {
      output.write(2, `throw new Error('Invalid value');`);
    }
    output.write(1, '}');

    output.write(0, `}`);

    return { output, className: typeCodes.className as string };
  }
}
