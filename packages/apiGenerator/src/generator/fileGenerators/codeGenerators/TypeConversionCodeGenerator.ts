export class TypeConversionCodeGenerator {
  public static generate(
    isRequired: boolean,
    sourceNativeType: string,
    targetNativeType: string,
    valueCode: string,
  ): string {
    if (sourceNativeType === targetNativeType) {
      return valueCode;
    }

    let code: string | undefined;
    switch (targetNativeType) {
      case 'number':
        switch (sourceNativeType) {
          case 'string':
            code = `Number(${valueCode})`;
            break;
        }
        break;

      case 'string':
        switch (sourceNativeType) {
          case 'number':
            code = `String(${valueCode})`;
            break;
          case 'Date':
            code = `${valueCode}.toISOString()`;
            break;
        }
        break;

      case 'Date':
        switch (sourceNativeType) {
          case 'string':
            code = `new Date(${valueCode})`;
            break;
        }
        break;
    }

    if (code) {
      return isRequired ? code : `${valueCode} !== undefined ? ${code} : undefined`;
    }
    throw new Error(`Conversion from ${sourceNativeType} to ${targetNativeType} is not supported`);
  }
}
