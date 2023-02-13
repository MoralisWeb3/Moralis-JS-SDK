import { ResolvedType } from '../TypeResolver';

export class ValueMappingCodeGenerator {
  public static generateJSON2TypeCode(resolvedType: ResolvedType, valueCode: string, isRequired: boolean): string {
    if (resolvedType.referenceType) {
      let code: string;
      if (resolvedType.isArray) {
        code = `${valueCode}.map((item) => ${resolvedType.referenceType.className}.fromJSON(item))`;
      } else {
        code = `${resolvedType.referenceType.className}.fromJSON(${valueCode})`;
      }
      return isRequired ? code : `${valueCode} ? ${code} : undefined`;
    }

    return valueCode;
  }

  public static generateType2JSONCode(resolvedType: ResolvedType, valueCode: string, isRequired: boolean): string {
    if (resolvedType.referenceType) {
      let code: string;
      if (resolvedType.isArray) {
        code = `${valueCode}.map((item) => item.toJSON())`;
      } else {
        code = `${valueCode}.toJSON()`;
      }
      return isRequired ? code : `${valueCode} ? ${code} : undefined`;
    }

    return valueCode;
  }

  public static generateInput2TypeCode(resolvedType: ResolvedType, valueCode: string, isRequired: boolean): string {
    if (resolvedType.referenceType) {
      const { className } = resolvedType.referenceType;
      let code: string;
      if (resolvedType.isArray) {
        code = `${valueCode}.map((item) => ${className}.create(item))`;
      } else {
        code = `${className}.create(${valueCode})`;
      }
      return isRequired ? code : `${valueCode} ? ${code} : undefined`;
    }

    return valueCode;
  }
}
