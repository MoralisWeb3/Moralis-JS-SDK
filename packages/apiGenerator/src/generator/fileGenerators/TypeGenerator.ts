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

  public static toTypeSelector(type: string, isArray: boolean, isRequired: boolean): string {
    if (isArray) {
      type = `${type}[]`;
    }
    if (!isRequired) {
      type = `${type} | undefined`;
    }
    return type;
  }

  public generateNames(type: TypeMapping): TypeGeneratorNames {
    let typeCode: string;
    let jsonTypeCode: string;
    let className: string | null = null;
    let jsonClassName: string | null = null;

    const refType = type as RefTypeMapping;
    if (refType.ref) {
      className = NameFormatter.joinName(this.classNamePrefix, refType.className);
      jsonClassName = className + 'JSON';

      typeCode = TypeGenerator.toTypeSelector(className, type.isArray, type.isRequired);
      jsonTypeCode = TypeGenerator.toTypeSelector(jsonClassName, type.isArray, type.isRequired);
    } else {
      const normalizedType = SimpleTypeNormalizer.normalize((type as SimpleTypeMapping).type);

      typeCode = TypeGenerator.toTypeSelector(normalizedType, type.isArray, type.isRequired);
      jsonTypeCode = typeCode;
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
