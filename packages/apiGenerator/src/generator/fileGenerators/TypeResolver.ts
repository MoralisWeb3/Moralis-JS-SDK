import { NameFormatter } from './codeGenerators/NameFormatter';
import { isComplexTypeDescriptor, isSimpleTypeDescriptor, TypeDescriptor } from '../../reader/TypeDescriptor';
import { MappingTarget } from '../GeneratorConfiguration';
import { TypeName } from 'src/reader/utils/TypeName';
import { MappingResolver } from './MappingResolver';

export interface ResolvedType {
  isArray: boolean;
  complexType?: ComplexResolvedType;
  simpleType?: string;
}

export interface ComplexResolvedType {
  className: string;
  importPath: string;
}

export class TypeResolver {
  public constructor(
    private readonly classNamePrefix: string,
    private readonly mappingResolver: MappingResolver,
    private readonly basePath: string,
  ) {}

  public resolveWithNoMapping(descriptor: TypeDescriptor): ResolvedType {
    if (isComplexTypeDescriptor(descriptor)) {
      const className = this.createClassName(descriptor.typeName);
      return {
        isArray: descriptor.isArray,
        complexType: {
          className,
          importPath: `${this.basePath}types/${className}`,
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

  public resolveForOperationParameter(descriptor: TypeDescriptor, parameterName: string): ResolvedType {
    const target = this.mappingResolver.tryResolveByOperationParameterName(parameterName);
    if (target) {
      return this.resolveTarget(descriptor, target);
    }
    return this.resolve(descriptor);
  }

  public resolveForComplexTypeProperty(descriptor: TypeDescriptor, propertyName: string): ResolvedType {
    const target = this.mappingResolver.tryResolveByComplexTypePropertyName(propertyName);
    if (target) {
      return this.resolveTarget(descriptor, target);
    }
    return this.resolve(descriptor);
  }

  public resolve(descriptor: TypeDescriptor): ResolvedType {
    let target: MappingTarget | undefined = undefined;

    if (isComplexTypeDescriptor(descriptor)) {
      target = this.mappingResolver.tryResolveByTypeName(descriptor.typeName.toString());
    }
    if (!target) {
      target = this.mappingResolver.tryResolveBy$ref(descriptor.ref.toString());
    }

    if (target) {
      return this.resolveTarget(descriptor, target);
    }
    return this.resolveWithNoMapping(descriptor);
  }

  //

  private createClassName(className: TypeName): string {
    return NameFormatter.getClassName(className.addPrefix(this.classNamePrefix));
  }

  private resolveTarget(descriptor: TypeDescriptor, target: MappingTarget): ResolvedType {
    if (!target.customClassName) {
      throw new Error('Not supported mapping target');
    }

    const importPath = target.customImport
      ? target.customImport
      : `${this.basePath}customTypes/${target.customClassName}`;
    return {
      isArray: descriptor.isArray,
      complexType: {
        className: target.customClassName,
        importPath,
      },
    };
  }
}
