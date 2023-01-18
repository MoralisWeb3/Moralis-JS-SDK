export class RefTypeMapping implements TypeMapping {
  public constructor(
    public readonly isArray: boolean,
    public readonly isRequired: boolean,
    public readonly ref: string,
    public readonly className: string,
  ) {}
}

export class SimpleTypeMapping implements TypeMapping {
  public constructor(
    public readonly isArray: boolean,
    public readonly isRequired: boolean,
    public readonly type: string,
  ) {}
}

export interface TypeMapping {
  isArray: boolean;
  isRequired: boolean;
}
