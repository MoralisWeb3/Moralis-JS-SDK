import { NameFormatter } from './codeGenerators/NameFormatter';
import { isComplexTypeDescriptor, isSimpleTypeDescriptor, TypeDescriptor } from '../../reader/TypeDescriptor';
import { MappingTarget } from '../GeneratorConfiguration';
import { TypeName } from 'src/reader/utils/TypeName';
import { MappingResolver } from './MappingResolver';

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
  public constructor(private readonly classNamePrefix: string, private readonly mappingResolver: MappingResolver) {}

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
    let target: MappingTarget | undefined = undefined;

    if (isComplexTypeDescriptor(descriptor)) {
      target = this.mappingResolver.tryResolveByTypeName(descriptor.typeName.toString());
    }
    if (!target) {
      target = this.mappingResolver.tryResolveBy$ref(descriptor.ref.toString());
    }

    if (target && target.customClassName) {
      const importPath = target.customImport ? target.customImport : `${basePath}customTypes/${target.customClassName}`;
      return {
        isArray: descriptor.isArray,
        complexType: {
          className: target.customClassName,
          importPath,
        },
      };
    }
    return this.resolveWithNoMapping(descriptor, basePath);
  }
}
