import { NameFormatter } from '../../reader/utils/NameFormatter';
import { isComplexTypeDescriptor, SimpleTypeDescriptor, TypeDescriptor } from '../../reader/TypeDescriptor';
import { SimpleTypeNormalizer } from './SimpleTypeNormalizer';

export interface TypeGeneratorNames {
  typeCode: string; // string, string[], EvmResult, EvmResult[] | undefined
  jsonTypeCode: string; // string, string[], EvmResultJSON, EvmResultJSON[] | undefined
  className: string | null;
  jsonClassName: string | null;
}

export class CodeGenerator {
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

  public generateNames(descriptor: TypeDescriptor, isRequired: boolean): TypeGeneratorNames {
    let typeCode: string;
    let jsonTypeCode: string;
    let className: string | null = null;
    let jsonClassName: string | null = null;

    if (isComplexTypeDescriptor(descriptor)) {
      className = NameFormatter.joinName(this.classNamePrefix, descriptor.className);
      jsonClassName = className + 'JSON';

      typeCode = CodeGenerator.toTypeSelector(className, descriptor.isArray, isRequired);
      jsonTypeCode = CodeGenerator.toTypeSelector(jsonClassName, descriptor.isArray, isRequired);
    } else {
      const normalizedType = SimpleTypeNormalizer.normalize((descriptor as SimpleTypeDescriptor).type);

      typeCode = CodeGenerator.toTypeSelector(normalizedType, descriptor.isArray, isRequired);
      jsonTypeCode = typeCode;
    }

    return {
      typeCode,
      jsonTypeCode,
      className,
      jsonClassName,
    };
  }

  public generateJSON2TypeCode(descriptor: TypeDescriptor, valueCode: string, isRequired: boolean) {
    if (!isComplexTypeDescriptor(descriptor)) {
      return valueCode;
    }

    const className = NameFormatter.joinName(this.classNamePrefix, descriptor.className);
    let code: string;
    if (descriptor.isArray) {
      code = `${valueCode}.map((item) => ${className}.create(item))`;
    } else {
      code = `${className}.create(${valueCode})`;
    }

    return isRequired ? code : `${valueCode} ? ${code} : undefined`;
  }

  public generateType2JSONCode(descriptor: TypeDescriptor, valueCode: string, isRequired: boolean) {
    if (!isComplexTypeDescriptor(descriptor)) {
      return valueCode;
    }

    let code: string;
    if (descriptor.isArray) {
      code = `${valueCode}.map((item) => item.toJSON())`;
    } else {
      code = `${valueCode}.toJSON()`;
    }

    return isRequired ? code : `${valueCode} ? ${code} : undefined`;
  }
}
