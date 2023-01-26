import { NameFormatter } from '../../reader/utils/NameFormatter';
import { isComplexTypeDescriptor, isSimpleTypeDescriptor, TypeDescriptor } from '../../reader/TypeDescriptor';
import { SimpleTypeNormalizer } from './SimpleTypeNormalizer';

export interface Types {
  colon: string;
  typeCode: string;
  inputTypeCode: string;
  jsonTypeCode: string;
  className: string | null;
  inputClassName: string | null;
  jsonClassName: string | null;
}

export class TypesGenerator {
  public constructor(private readonly classNamePrefix: string) {}

  public static toTypeCode(type: string, isArray: boolean): string {
    return isArray ? `${type}[]` : type;
  }

  public static toColon(isRequired: boolean): string {
    return isRequired ? ':' : '?:';
  }

  public createClassName(name: string): string {
    return NameFormatter.joinName(this.classNamePrefix, name);
  }

  public generate(descriptor: TypeDescriptor, isRequired: boolean): Types {
    const colon = TypesGenerator.toColon(isRequired);

    if (isComplexTypeDescriptor(descriptor)) {
      const className = this.createClassName(descriptor.className);
      const jsonClassName = className + 'JSON';
      const inputClassName = className + 'Input';

      return {
        colon,
        className,
        inputClassName,
        jsonClassName,
        typeCode: TypesGenerator.toTypeCode(className, descriptor.isArray),
        inputTypeCode: TypesGenerator.toTypeCode(inputClassName, descriptor.isArray),
        jsonTypeCode: TypesGenerator.toTypeCode(jsonClassName, descriptor.isArray),
      };
    }

    if (isSimpleTypeDescriptor(descriptor)) {
      const normalizedType = SimpleTypeNormalizer.normalize(descriptor.type);
      const typeCode = TypesGenerator.toTypeCode(normalizedType, descriptor.isArray);

      return {
        colon,
        typeCode,
        inputTypeCode: typeCode,
        jsonTypeCode: typeCode,
        className: null,
        inputClassName: null,
        jsonClassName: null,
      };
    }

    throw new Error('Not supported descriptor type');
  }

  public generateJSON2TypeCode(descriptor: TypeDescriptor, valueCode: string, isRequired: boolean) {
    if (isComplexTypeDescriptor(descriptor)) {
      const className = this.createClassName(descriptor.className);
      let code: string;
      if (descriptor.isArray) {
        code = `${valueCode}.map((item) => ${className}.fromJSON(item))`;
      } else {
        code = `${className}.fromJSON(${valueCode})`;
      }
      return isRequired ? code : `${valueCode} ? ${code} : undefined`;
    }
    return valueCode;
  }

  public generateType2JSONCode(descriptor: TypeDescriptor, valueCode: string, isRequired: boolean) {
    if (isComplexTypeDescriptor(descriptor)) {
      let code: string;
      if (descriptor.isArray) {
        code = `${valueCode}.map((item) => item.toJSON())`;
      } else {
        code = `${valueCode}.toJSON()`;
      }
      return isRequired ? code : `${valueCode} ? ${code} : undefined`;
    }
    return valueCode;
  }

  public generateInput2TypeCode(descriptor: TypeDescriptor, valueCode: string, isRequired: boolean) {
    if (isComplexTypeDescriptor(descriptor)) {
      const className = this.createClassName(descriptor.className);
      let code: string;
      if (descriptor.isArray) {
        code = `${valueCode}.map((item) => ${className}.create(item))`;
      } else {
        code = `${className}.create(${valueCode})`;
      }
      return isRequired ? code : `${valueCode} ? ${code} : undefined`;
    }
    return valueCode;
  }
}
