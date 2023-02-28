import { NameFormatter } from '../codeGenerators/NameFormatter';
import { isReferenceTypeDescriptor, isNativeTypeDescriptor, TypeDescriptor } from '../../../reader/TypeDescriptor';
import { MappingTarget } from '../../GeneratorConfiguration';
import { TypeName } from 'src/reader/utils/TypeName';
import { MappingResolver } from './MappingResolver';

export interface ResolvedType {
  isArray: boolean;
  simpleType?: string;
  referenceType?: ReferenceResolvedType;
}

export interface ReferenceResolvedType {
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
    if (isReferenceTypeDescriptor(descriptor)) {
      const className = this.createClassName(descriptor.typeName);
      return {
        isArray: descriptor.isArray,
        referenceType: {
          className,
          importPath: `${this.basePath}types/${className}`,
        },
      };
    }
    if (isNativeTypeDescriptor(descriptor)) {
      return {
        isArray: descriptor.isArray,
        simpleType: descriptor.nativeType,
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

    if (isReferenceTypeDescriptor(descriptor)) {
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
    if (!target.className) {
      throw new Error('Not supported mapping target');
    }

    const importPath = target.import ? target.import : `${this.basePath}customTypes/${target.className}`;
    return {
      isArray: descriptor.isArray,
      referenceType: {
        className: target.className,
        importPath,
      },
    };
  }
}
