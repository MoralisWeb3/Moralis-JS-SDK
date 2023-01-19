import { NameFormatter } from '../../reader/NameFormatter';
import { RefTypeMapping, SimpleTypeMapping, TypeMapping } from '../../reader/TypeMapping';

export interface TypeGeneratorNames {
  typeCode: string; // string, string[], EvmResult, EvmResult[] | undefined
  jsonTypeCode: string; // string, string[], EvmResultJSON, EvmResultJSON[] | undefined
  className: string | null;
  jsonClassName: string | null;
}

export class TypeGenerator {
  public constructor(private readonly classNamePrefix: string) {}

  public generateNames(type: TypeMapping): TypeGeneratorNames {
    let typeCode: string;
    let jsonTypeCode: string;
    let className: string | null = null;
    let jsonClassName: string | null = null;

    const refType = type as RefTypeMapping;
    if (refType.ref) {
      className = NameFormatter.joinName(this.classNamePrefix, refType.className);
      jsonClassName = className + 'JSON';

      if (refType.isArray) {
        typeCode = `${className}[]`;
        jsonTypeCode = `${jsonClassName}[]`;
      } else {
        typeCode = className;
        jsonTypeCode = jsonClassName;
      }
    } else {
      let simpleType = type as SimpleTypeMapping;
      const normalizedType = SimpleTypeNormalizer.normalize(simpleType.type);
      if (simpleType.isArray) {
        typeCode = `${normalizedType}[]`;
      } else {
        typeCode = normalizedType;
      }
      jsonTypeCode = typeCode;
    }

    if (!refType.isRequired) {
      typeCode = typeCode + ' | undefined';
      jsonTypeCode = jsonTypeCode + ' | undefined';
    }

    return {
      typeCode,
      jsonTypeCode,
      className,
      jsonClassName,
    };
  }

  public generateMappingCode(type: TypeMapping, valueCode: string) {
    const refType = type as RefTypeMapping;

    if (refType.ref) {
      const className = NameFormatter.joinName(this.classNamePrefix, refType.className);

      let code: string;
      if (refType.isArray) {
        code = `${valueCode}.map((item) => ${className}.create(item))`;
      } else {
        code = `${className}.create(${valueCode})`;
      }

      return type.isRequired ? code : `${valueCode} ? ${code} : undefined`;
    }

    return valueCode;
  }
}

export class SimpleTypeNormalizer {
  public static normalize(type: string): string {
    switch (type) {
      case 'integer':
        return 'number';
      case 'array':
      case 'object':
        throw new Error(`Invalid simple type: ${type}`);
    }
    return type;
  }
}
