import { TypeName } from '../../../reader/utils/TypeName';

export class NameFormatter {
  public static getClassName(className: TypeName): string {
    return className.parts
      .map((part) => {
        part = normalize(part);
        part = toCamelCase(part);
        part = capitalizeFirst(part);
        return part;
      })
      .join('');
  }

  public static getParameterName(name: string): string {
    name = normalize(name);
    name = toCamelCase(name);
    return lowercaseFirst(name);
  }

  public static getOperationClassName(operationId: string): string {
    return NameFormatter.getClassName(TypeName.from(operationId).add('Operation'));
  }
}

function toCamelCase(value: string): string {
  return value.replace(/([-_][a-z])/gi, (found) => {
    return found.toUpperCase().replace('-', '').replace('_', '');
  });
}

function normalize(value: string): string {
  return value.replace(/\W+/g, '_').replace(/^_|_$/g, '');
}

function capitalizeFirst(value: string): string {
  return value.substring(0, 1).toUpperCase() + value.substring(1);
}

function lowercaseFirst(value: string): string {
  return value.substring(0, 1).toLowerCase() + value.substring(1);
}
