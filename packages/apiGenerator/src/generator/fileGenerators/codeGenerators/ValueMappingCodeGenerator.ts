import { ResolvedType } from '../resolvers/TypeResolver';

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
      let toJsonCode: string;
      if (resolvedType.referenceType.isSimpleType) {
        toJsonCode = `%`;
      } else if (resolvedType.referenceType.isUnionType) {
        toJsonCode = `${resolvedType.referenceType.className}.toJSON(%)`;
      } else {
        toJsonCode = `%.toJSON()`;
      }

      let code: string;
      if (resolvedType.isArray) {
        code = `${valueCode}.map((item) => ${toJsonCode.replace('%', 'item')})`;
      } else {
        code = toJsonCode.replace('%', valueCode);
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
