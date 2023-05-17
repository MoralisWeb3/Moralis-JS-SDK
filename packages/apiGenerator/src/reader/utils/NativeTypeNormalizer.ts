export class NativeTypeNormalizer {
  public static normalize(nativeType: string): string {
    switch (nativeType) {
      case 'number':
      case 'integer':
        return 'number';
      case 'array':
        throw new Error(`Invalid native type: ${nativeType}`);
      case 'string':
      case 'boolean':
      case 'object':
      case 'null':
        return nativeType;
    }
    throw new Error(`Not supported native type: ${nativeType}`);
  }
}
