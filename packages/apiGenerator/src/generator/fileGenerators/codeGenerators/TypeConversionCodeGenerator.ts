export class TypeConversionCodeGenerator {
  public static generate(sourceNativeType: string, targetNativeType: string, valueCode: string): string {
    if (sourceNativeType === targetNativeType) {
      return valueCode;
    }

    switch (targetNativeType) {
      case 'number':
        switch (sourceNativeType) {
          case 'string':
            return `Number(${valueCode})`;
        }
        break;

      case 'string':
        switch (sourceNativeType) {
          case 'number':
            return `String(${valueCode})`;
          case 'Date':
            return `${valueCode}.toISOString()`;
        }
        break;

      case 'Date':
        switch (sourceNativeType) {
          case 'string':
            return `new Date(${valueCode})`;
        }
        break;
    }

    throw new Error(`Conversion from ${sourceNativeType} to ${targetNativeType} is not supported`);
  }
}
