import { UnionTypeInfo } from '../../reader/OpenApiReaderResult';
import { Output } from '../output/Output';
import { TypeCodesGenerator } from './codeGenerators/TypeCodesGenerator';
import { TypeResolver } from './TypeResolver';
import { TypeScriptOutput } from '../output/TypeScriptOutput';
import { isSimpleTypeDescriptor, UnionType } from '../../reader/TypeDescriptor';

export interface UnionTypeFileGeneratorResult {
  className: string;
  output: Output;
}

export class UnionTypeFileGenerator {
  public constructor(private readonly info: UnionTypeInfo, private readonly typeResolver: TypeResolver) {}

  public generate(): UnionTypeFileGeneratorResult {
    if (this.info.descriptor.unionType !== UnionType.oneOf) {
      throw new Error(`Generator supports only oneOf union type, but got ${this.info.descriptor.unionType}`);
    }

    const resolvedType = this.typeResolver.resolveWithNoMapping(this.info.descriptor);
    const { referenceType: referenceTypeCodes, inputUnionTypeCode } = TypeCodesGenerator.generate(resolvedType, true);
    if (!referenceTypeCodes) {
      throw new Error('Reference type is only supported');
    }

    const unionTypes = this.info.unionDescriptors.map((descriptor) => {
      if (!isSimpleTypeDescriptor(descriptor)) {
        throw new Error('Generator supports only simple types');
      }

      const unionResolvedType = this.typeResolver.resolveWithNoMapping(descriptor);
      return {
        typeCodes: TypeCodesGenerator.generate(unionResolvedType, true),
      };
    });

    const unionJsonTypeCode = unionTypes.map((unionType) => unionType.typeCodes.jsonTypeCode).join(' | ');
    const unionInputTypeCode = unionTypes.map((unionType) => unionType.typeCodes.inputUnionTypeCode).join(' | ');

    // view:

    const output = new TypeScriptOutput();

    output.write(0, `// $ref: ${this.info.descriptor.ref.toString()}`);
    output.write(0, `// typeName: ${this.info.descriptor.typeName.toString()}`);
    output.newLine();

    output.write(0, `export type ${referenceTypeCodes.jsonClassName} = ${unionJsonTypeCode};`);
    output.write(0, `export type ${referenceTypeCodes.inputClassName} = ${unionInputTypeCode};`);
    output.newLine();

    output.write(0, `export class ${referenceTypeCodes.className} {`);

    output.write(1, `public static create(input: ${inputUnionTypeCode}) {`);
    output.write(2, `if (input instanceof ${referenceTypeCodes.className}) {`);
    output.write(3, `return input;`);
    output.write(2, `}`);
    output.write(2, `return new ${referenceTypeCodes.className}(input);`);
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public static fromJSON(json: ${referenceTypeCodes.jsonClassName}) {`);
    output.write(2, `return new ${referenceTypeCodes.className}(json);`);
    output.write(1, `}`);
    output.newLine();

    output.write(1, `public constructor(public readonly value: ${referenceTypeCodes.inputClassName}) {}`);
    output.newLine();

    output.write(1, `public toJSON(): ${referenceTypeCodes.jsonClassName} {`);
    output.write(2, 'return this.value;');
    output.write(1, '}');

    output.write(0, `}`);

    return { output, className: referenceTypeCodes.className as string };
  }
}
