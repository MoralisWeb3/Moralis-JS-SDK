export class CollectionNameBuilder {
  private readonly cache: Record<string, string> = {};
  private cacheLimit = 256;

  public build(tag: string): string {
    let result = this.cache[tag];
    if (!result) {
      result = this.process(tag);
      if (this.cacheLimit > 0) {
        // Simple anti DDOS protection.
        this.cache[tag] = result;
        this.cacheLimit--;
      }
    }
    return result;
  }

  private process(tag: string): string {
    const parts = tag
      .split(/[^a-zA-Z0-9_]/)
      .filter((p) => !!p)
      .map((p) => {
        return p.substring(0, 1).toUpperCase() + p.substring(1).toLowerCase();
      });
    if (parts.length < 1) {
      throw new Error(`Cannot build table name from value "${tag}"`);
    }
    return parts.join('');
  }
}
