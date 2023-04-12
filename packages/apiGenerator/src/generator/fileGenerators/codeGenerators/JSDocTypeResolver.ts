import { ResolvedType } from '../resolvers/TypeResolver';

export class JSDocTypeResolver {
  public static resolve(type: ResolvedType): string {
    let result: string;

    if (type.nativeType) {
      switch (type.nativeType) {
        case 'string':
          result = 'String';
          break;
        case 'number':
          result = 'Number';
          break;
        case 'boolean':
          result = 'Boolean';
          break;
        default:
          throw new Error(`Unknown native type: ${type.nativeType}`);
      }
    } else {
      result = 'Object';
    }

    return type.isArray ? `${result}[]` : result;
  }
}
