export class ComplexTypeDescriptor implements TypeDescriptor {
  public constructor(
    public readonly isArray: boolean,
    public readonly isRequired: boolean,
    public readonly ref: string,
    public readonly className: string,
  ) {}
}

export class SimpleTypeDescriptor implements TypeDescriptor {
  public constructor(
    public readonly isArray: boolean,
    public readonly isRequired: boolean,
    public readonly type: string,
  ) {}
}

export interface TypeDescriptor {
  isArray: boolean;
  isRequired: boolean;
}

export function isComplexTypeDescriptor(descriptor: TypeDescriptor): descriptor is ComplexTypeDescriptor {
  return !!(descriptor as ComplexTypeDescriptor).className;
}

export function isSimpleTypeDescriptor(description: TypeDescriptor): description is SimpleTypeDescriptor {
  return !!(description as SimpleTypeDescriptor).type;
}
