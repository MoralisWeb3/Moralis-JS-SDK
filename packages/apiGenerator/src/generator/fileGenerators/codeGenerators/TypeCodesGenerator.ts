import { NativeTypeNormalizer } from './NativeTypeNormalizer';
import { ResolvedType } from '../resolvers/TypeResolver';

export interface TypeCodes {
  colon: string;

  valueTypeCode: string;
  inputTypeCode: string;
  jsonTypeCode: string;
  inputOrValueTypeCode: string;

  undefinedSuffix: string;
  referenceType: ReferenceTypeCodes | null;
}

export interface ReferenceTypeCodes {
  factoryClassName: string;
  valueClassName: string;
  inputClassName: string;
  jsonClassName: string;
  importPath: string;
}

export class TypeCodesGenerator {
  public static getTypeCode(type: string, isArray: boolean): string {
    return isArray ? `${type}[]` : type;
  }

  public static generate(resolvedType: ResolvedType, isRequired: boolean): TypeCodes {
    const colon = isRequired ? ':' : '?:';
    const undefinedSuffix = isRequired ? '' : ' | undefined';

    if (resolvedType.referenceType) {
      const { className, isSimpleType, isUnionType } = resolvedType.referenceType;
      const valueClassName = isSimpleType || isUnionType ? `${className}Value` : className;
      const jsonClassName = className + 'JSON';
      const inputClassName = className + 'Input';
      const valueTypeCode = TypeCodesGenerator.getTypeCode(valueClassName, resolvedType.isArray);
      const inputTypeCode = TypeCodesGenerator.getTypeCode(inputClassName, resolvedType.isArray);

      return {
        colon,

        valueTypeCode,
        inputTypeCode,
        jsonTypeCode: TypeCodesGenerator.getTypeCode(jsonClassName, resolvedType.isArray),
        inputOrValueTypeCode: `${inputTypeCode} | ${valueTypeCode}`,

        undefinedSuffix,
        referenceType: {
          factoryClassName: className,
          valueClassName,
          inputClassName,
          jsonClassName,
          importPath: resolvedType.referenceType.importPath,
        },
      };
    }

    if (resolvedType.nativeType) {
      const normalizedNativeType = NativeTypeNormalizer.normalize(resolvedType.nativeType);
      const typeCode = TypeCodesGenerator.getTypeCode(normalizedNativeType, resolvedType.isArray);

      return {
        colon,
        valueTypeCode: typeCode,
        inputTypeCode: typeCode,
        jsonTypeCode: typeCode,
        inputOrValueTypeCode: typeCode,
        undefinedSuffix,
        referenceType: null,
      };
    }

    throw new Error('Unknown descriptor type');
  }

  public static generateNull(): TypeCodes {
    return {
      colon: ':',
      valueTypeCode: 'null',
      inputTypeCode: 'null',
      inputOrValueTypeCode: 'null',
      jsonTypeCode: 'null',
      undefinedSuffix: '',
      referenceType: null,
    };
  }
}
