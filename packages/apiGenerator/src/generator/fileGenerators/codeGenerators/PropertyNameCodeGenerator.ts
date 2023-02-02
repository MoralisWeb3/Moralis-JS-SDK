import { NameFormatter } from './NameFormatter';

export interface PropertyNameCodes {
  nameCode: string;
  accessCode: string;
  camelCasedNameCode: string;
  camelCasedAccessCode: string;
}

export class PropertyNameCodeGenerator {
  public static generate(name: string): PropertyNameCodes {
    const isSafe = isNameSafe(name);
    const nameCode = isSafe ? name : `'${name}'`;
    const camelCasedNameCode = isSafe ? NameFormatter.getParameterName(name) : `'${name}'`;
    const accessCode = isSafe ? `.${nameCode}` : `[${nameCode}]`;
    const camelCasedAccessCode = isSafe ? `.${camelCasedNameCode}` : `[${camelCasedNameCode}]`;
    return {
      nameCode,
      accessCode,
      camelCasedNameCode,
      camelCasedAccessCode,
    };
  }
}

function isNameSafe(name: string): boolean {
  return /^[a-zA-Z_][a-zA-Z_0-9]*$/.test(name);
}
