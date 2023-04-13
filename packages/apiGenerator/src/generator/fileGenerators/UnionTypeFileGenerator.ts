import { UnionTypeInfo } from '../../reader/OpenApiContract';
import { Output } from '../output/Output';
import { TypeCodesGenerator } from './codeGenerators/TypeCodesGenerator';
import { TypeResolver } from './resolvers/TypeResolver';
import { TypeScriptOutput } from '../output/TypeScriptOutput';

export interface UnionTypeFileGeneratorResult {
  className: string;
  output: Output;
}

export class UnionTypeFileGenerator {
  public constructor(private readonly info: UnionTypeInfo, private readonly typeResolver: TypeResolver) {}

  public generate(): UnionTypeFileGeneratorResult {
    const resolvedType = this.typeResolver.resolveWithNoMapping(this.info.descriptor);
    const { referenceType: typeCodes, inputOrValueTypeCode: inputUnionTypeCode } = TypeCodesGenerator.generate(
      resolvedType,
      true,
    );
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
    const unionValueTypeCode = unionTypes.map((unionType) => unionType.typeCodes.valueTypeCode).join(' | ');
    const hasAnySimpleType = unionTypes.some((unionType) => !unionType.typeCodes.referenceType);

    // view:

    const output = new TypeScriptOutput();

    for (const unionType of unionTypes) {
      if (unionType.typeCodes.referenceType) {
        output.addImport(
          [
            unionType.typeCodes.referenceType.factoryClassName,
            unionType.typeCodes.referenceType.valueClassName,
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
    output.write(0, `// unionType: ${this.info.unionType}`);
    output.newLine();

    output.write(0, `export type ${typeCodes.jsonClassName} = ${unionJsonTypeCode};`);
    output.write(0, `export type ${typeCodes.inputClassName} = ${unionInputTypeCode};`);
    output.write(0, `export type ${typeCodes.valueClassName} = ${unionValueTypeCode};`);
    output.newLine();

    output.write(0, `export abstract class ${typeCodes.factoryClassName} {`);

    output.write(1, `public static create(input: ${typeCodes.inputClassName}): ${typeCodes.valueClassName} {`);
    for (const unionType of unionTypes) {
      if (!unionType.typeCodes.referenceType) {
        continue;
      }
      output.write(2, `if (${unionType.typeCodes.referenceType.factoryClassName}.isInput(input)) {`);
      output.write(3, `return ${unionType.typeCodes.referenceType.factoryClassName}.create(input);`);
      output.write(2, '}');
    }

    if (hasAnySimpleType) {
      output.write(2, `return input;`);
    } else {
      output.write(2, `throw new Error('Cannot resolve union from ${typeCodes.inputClassName}');`);
    }
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public static fromJSON(json: ${typeCodes.jsonClassName}): ${typeCodes.valueClassName} {`);
    for (const unionType of unionTypes) {
      if (!unionType.typeCodes.referenceType) {
        continue;
      }
      output.write(2, `if (${unionType.typeCodes.referenceType.factoryClassName}.isJSON(json)) {`);
      output.write(3, `return ${unionType.typeCodes.referenceType.factoryClassName}.fromJSON(json);`);
      output.write(2, '}');
    }

    if (hasAnySimpleType) {
      output.write(2, `return json;`);
    } else {
      output.write(2, `const keys = Object.keys(json).join(', ');`);
      output.write(2, `const type = (json as any).type;`);
      output.write(
        2,
        `throw new Error(\`Cannot resolve union from ${typeCodes.jsonClassName} (keys: \${keys}, type: \${type})\`);`,
      );
    }
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public static toJSON(value: ${typeCodes.valueClassName}): ${typeCodes.jsonClassName} {`);
    for (const unionType of unionTypes) {
      if (!unionType.typeCodes.referenceType) {
        continue;
      }
      output.write(2, `if (value instanceof ${unionType.typeCodes.referenceType.factoryClassName}) {`);
      output.write(3, `return value.toJSON();`);
      output.write(2, '}');
    }
    if (hasAnySimpleType) {
      output.write(2, `return value;`);
    } else {
      output.write(2, `throw new Error('Cannot resolve union from ${typeCodes.valueClassName}');`);
    }
    output.write(1, `}`);

    output.write(0, `}`);

    return { output, className: typeCodes.factoryClassName as string };
  }
}
