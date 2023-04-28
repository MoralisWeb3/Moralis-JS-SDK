import { ResolvedType } from '../resolvers/TypeResolver';

export class JSDocTypeResolver {
  public static resolve(type: ResolvedType): string {
    let result: string;

    if (type.nativeType) {
      switch (type.nativeType.valueType) {
        case 'string':
          result = 'String';
          break;
        case 'number':
          result = 'Number';
          break;
        case 'boolean':
          result = 'Boolean';
          break;
        case 'Date':
          result = 'Date';
          break;
        default:
          throw new Error(`Unknown native type: ${type.nativeType.valueType}`);
      }
    } else {
      result = 'Object';
    }

    return type.isArray ? `${result}[]` : result;
  }
}
