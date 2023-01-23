export class SimpleTypeNormalizer {
  public static normalize(type: string): string {
    switch (type) {
      case 'integer':
        return 'number';
      case 'array':
      case 'object':
        throw new Error(`Invalid simple type: ${type}`);
    }
    return type;
  }
}
