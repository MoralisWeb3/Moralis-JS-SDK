import { SimpleTypeNormalizer } from './SimpleTypeNormalizer';
import { ResolvedType } from '../TypeResolver';

export interface TypeCodes {
  colon: string;
  typeCode: string;
  inputUnionTypeCode: string;
  jsonTypeCode: string;
  undefinedSuffix: string;
  complexType: ComplexTypeCodes | null;
}

export interface ComplexTypeCodes {
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

    if (resolvedType.complexType) {
      const jsonClassName = resolvedType.complexType.className + 'JSON';
      const inputClassName = resolvedType.complexType.className + 'Input';
      const typeCode = TypeCodesGenerator.getTypeCode(resolvedType.complexType.className, resolvedType.isArray);
      const inputTypeCode = TypeCodesGenerator.getTypeCode(inputClassName, resolvedType.isArray);

      return {
        colon,
        typeCode,
        inputUnionTypeCode: `${inputTypeCode} | ${typeCode}`,
        jsonTypeCode: TypeCodesGenerator.getTypeCode(jsonClassName, resolvedType.isArray),
        undefinedSuffix,
        complexType: {
          className: resolvedType.complexType.className,
          inputClassName,
          jsonClassName,
          importPath: resolvedType.complexType.importPath,
        },
      };
    }

    if (resolvedType.simpleType) {
      const normalizedType = SimpleTypeNormalizer.normalize(resolvedType.simpleType);
      const typeCode = TypeCodesGenerator.getTypeCode(normalizedType, resolvedType.isArray);

      return {
        colon,
        typeCode,
        inputUnionTypeCode: typeCode,
        jsonTypeCode: typeCode,
        undefinedSuffix,
        complexType: null,
      };
    }

    throw new Error('Unknown descriptor type');
  }

  public static generateNull(): TypeCodes {
    return {
      colon: ':',
      typeCode: 'null',
      inputUnionTypeCode: 'null',
      jsonTypeCode: 'null',
      undefinedSuffix: '',
      complexType: null,
    };
  }
}
