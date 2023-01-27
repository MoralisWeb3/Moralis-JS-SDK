import { NameFormatter } from './codeGenerators/NameFormatter';
import { isComplexTypeDescriptor, isSimpleTypeDescriptor, TypeDescriptor } from '../../reader/TypeDescriptor';
import { TypeMappings } from '../GeneratorConfiguration';
import { TypeName } from 'src/reader/utils/TypeName';

export interface ResolvedType {
  isArray: boolean;
  complexType?: ResolvedComplexType;
  simpleType?: string;
}

export interface ResolvedComplexType {
  className: string;
  importPath: string;
}

export class TypeResolver {
  public constructor(private readonly classNamePrefix: string, private readonly typeMappings: TypeMappings) {}

  public createClassName(className: TypeName): string {
    return NameFormatter.getClassName(className.unshift(this.classNamePrefix));
  }

  public resolveWithNoMapping(descriptor: TypeDescriptor, basePath: string): ResolvedType {
    if (isComplexTypeDescriptor(descriptor)) {
      const className = this.createClassName(descriptor.typeName);
      return {
        isArray: descriptor.isArray,
        complexType: {
          className,
          importPath: `${basePath}types/${className}`,
        },
      };
    }

    if (isSimpleTypeDescriptor(descriptor)) {
      return {
        isArray: descriptor.isArray,
        simpleType: descriptor.simpleType,
      };
    }

    throw new Error('Unsupported descriptor type');
  }

  public resolve(descriptor: TypeDescriptor, basePath: string): ResolvedType {
    if (isComplexTypeDescriptor(descriptor)) {
      const typeName = descriptor.typeName.toString();
      const mapping = this.typeMappings.classMappings.find((m) => m.typeName === typeName);
      if (mapping && mapping.customClassName) {
        return {
          isArray: descriptor.isArray,
          complexType: {
            className: mapping.customClassName,
            importPath: `${basePath}customTypes/${mapping.customClassName}`,
          },
        };
      }
    }

    return this.resolveWithNoMapping(descriptor, basePath);
  }
}
