export class SimpleTypeNormalizer {
  public static normalize(type: string): string {
    switch (type) {
      case 'integer':
        return 'number';
      case 'array':
        throw new Error(`Invalid simple type: ${type}`);
      case 'string':
      case 'boolean':
      case 'number':
      case 'object':
        return type;
    }
    throw new Error(`Not supported simple type: ${type}`);
  }
}
