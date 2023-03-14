export class UniquenessChecker {
  private readonly values: string[] = [];

  public check(value: string, error: () => string) {
    if (this.values.includes(value)) {
      throw new Error(error());
    }
    this.values.push(value);
  }
}
