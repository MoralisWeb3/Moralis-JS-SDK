export class SimpleTypeNormalizer {
  public static normalize(simpleType: string): string {
    switch (simpleType) {
      case 'integer':
        return 'number';
      case 'array':
        throw new Error(`Invalid simple type: ${simpleType}`);
      case 'string':
      case 'boolean':
      case 'number':
      case 'object':
      case 'null':
        return simpleType;
    }
    throw new Error(`Not supported simple type: ${simpleType}`);
  }
}
