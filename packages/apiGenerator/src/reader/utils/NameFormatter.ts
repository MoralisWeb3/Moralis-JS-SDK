export class NameFormatter {
  public static normalize(value: string): string {
    return value.replace(/\W+/g, '_');
  }

  public static toCamelCase(value: string) {
    return value.replace(/([-_][a-z])/gi, (found) => {
      return found.toUpperCase().replace('-', '').replace('_', '');
    });
  }

  public static joinName(prefix: string, name: string): string {
    const camelCasedName = NameFormatter.toCamelCase(name);
    return prefix + NameFormatter.capitalizeFirst(camelCasedName);
  }

  public static capitalizeFirst(value: string): string {
    return value.substring(0, 1).toUpperCase() + value.substring(1);
  }
}
