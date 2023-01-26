import { NameFormatter } from '../../reader/utils/NameFormatter';
import { isComplexTypeDescriptor, isSimpleTypeDescriptor, TypeDescriptor } from '../../reader/TypeDescriptor';

export interface ResolvedType {
  isArray: boolean;
  complexType?: {
    className: string;
    importPath: string;
  };
  simpleType?: string;
}

export class TypeResolver {
  public constructor(private readonly classNamePrefix: string) {}

  public createClassName(className: string): string {
    return NameFormatter.joinName(this.classNamePrefix, className);
  }

  public resolve(descriptor: TypeDescriptor): ResolvedType {
    if (isComplexTypeDescriptor(descriptor)) {
      const className = this.createClassName(descriptor.className);
      return {
        isArray: descriptor.isArray,
        complexType: {
          className,
          importPath: `../types/${className}`,
        },
      };
    }

    if (isSimpleTypeDescriptor(descriptor)) {
      return {
        isArray: descriptor.isArray,
        simpleType: descriptor.type,
      };
    }

    throw new Error('Unsupported descriptor type');
  }
}
