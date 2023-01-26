import { SimpleTypeNormalizer } from './SimpleTypeNormalizer';
import { ResolvedType } from '../TypeResolver';

export interface TypeCodes {
  colon: string;
  typeCode: string;
  inputTypeCode: string;
  jsonTypeCode: string;
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

  public static getColon(isRequired: boolean): string {
    return isRequired ? ':' : '?:';
  }

  public static generate(resolvedType: ResolvedType, isRequired: boolean): TypeCodes {
    const colon = TypeCodesGenerator.getColon(isRequired);

    if (resolvedType.complexType) {
      const jsonClassName = resolvedType.complexType.className + 'JSON';
      const inputClassName = resolvedType.complexType.className + 'Input';

      return {
        colon,
        typeCode: TypeCodesGenerator.getTypeCode(resolvedType.complexType.className, resolvedType.isArray),
        inputTypeCode: TypeCodesGenerator.getTypeCode(inputClassName, resolvedType.isArray),
        jsonTypeCode: TypeCodesGenerator.getTypeCode(jsonClassName, resolvedType.isArray),
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
        inputTypeCode: typeCode,
        jsonTypeCode: typeCode,
        complexType: null,
      };
    }

    throw new Error('Unknown descriptor type');
  }
}
