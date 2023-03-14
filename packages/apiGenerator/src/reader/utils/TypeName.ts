export class TypeName {
  public static from(part: string) {
    return new TypeName([part]);
  }

  private constructor(public readonly parts: string[]) {}

  public addPrefix(part: string): TypeName {
    return new TypeName([part].concat(this.parts));
  }

  public add(part: string): TypeName {
    return new TypeName(this.parts.concat(part));
  }

  public toString(): string {
    return this.parts.join('_');
  }
}
