export class ParamNameResolver {
  private readonly usedNames: string[] = [];

  public constructor(private readonly restrictedNames: string[]) {}

  public iterate<Value>(object: Record<string, Value>, callback: (safeName: string, value: Value) => void) {
    // We need to always keep parameters in the same order
    // because the RowParamNameResolver is order-sensitive.
    const sortedNames = Object.keys(object).sort((a, b) => a.localeCompare(b));

    sortedNames.forEach((name) => {
      const safeName = this.resolve(name);
      callback(safeName, object[name]);
    });
  }

  public resolve(name: string): string {
    if (this.isUsed(name)) {
      do {
        name = `_${name}`;
      } while (this.isUsed(name));
    }

    this.usedNames.push(name);
    return name;
  }

  private isUsed(name: string): boolean {
    return this.restrictedNames.includes(name) || this.usedNames.includes(name);
  }
}
