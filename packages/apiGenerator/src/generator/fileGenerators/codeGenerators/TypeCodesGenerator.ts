import { SimpleTypeNormalizer } from './SimpleTypeNormalizer';
import { ResolvedType } from '../resolvers/TypeResolver';

export interface TypeCodes {
  colon: string;
  typeCode: string;
  inputTypeCode: string;
  inputUnionTypeCode: string;
  jsonTypeCode: string;
  undefinedSuffix: string;
  referenceType: ReferenceTypeCodes | null;
}

export interface ReferenceTypeCodes {
  className: string;
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
      const jsonClassName = resolvedType.referenceType.className + 'JSON';
      const inputClassName = resolvedType.referenceType.className + 'Input';
      const typeCode = TypeCodesGenerator.getTypeCode(resolvedType.referenceType.className, resolvedType.isArray);
      const inputTypeCode = TypeCodesGenerator.getTypeCode(inputClassName, resolvedType.isArray);

      return {
        colon,
        typeCode,
        inputTypeCode,
        inputUnionTypeCode: `${inputTypeCode} | ${typeCode}`,
        jsonTypeCode: TypeCodesGenerator.getTypeCode(jsonClassName, resolvedType.isArray),
        undefinedSuffix,
        referenceType: {
          className: resolvedType.referenceType.className,
          inputClassName,
          jsonClassName,
          importPath: resolvedType.referenceType.importPath,
        },
      };
    }

    if (resolvedType.simpleType) {
      const normalizedType = SimpleTypeNormalizer.normalize(resolvedType.simpleType);
      const typeCode = TypeCodesGenerator.getTypeCode(normalizedType, resolvedType.isArray);

      return {
        colon,
        typeCode,
        inputTypeCode: typeCode,
        inputUnionTypeCode: typeCode,
        jsonTypeCode: typeCode,
        undefinedSuffix,
        referenceType: null,
      };
    }

    throw new Error('Unknown descriptor type');
  }

  public static generateNull(): TypeCodes {
    return {
      colon: ':',
      typeCode: 'null',
      inputTypeCode: 'null',
      inputUnionTypeCode: 'null',
      jsonTypeCode: 'null',
      undefinedSuffix: '',
      referenceType: null,
    };
  }
}
