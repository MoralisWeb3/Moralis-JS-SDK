import { NameFormatter } from '../codeGenerators/NameFormatter';

export interface PropertyNameModel {
  rawName: string;
  rawNameCode: string;
  rawAccessCode: string;
  normalizedName: string;
  normalizedNameCode: string;
  normalizedAccessCode: string;
}

export class PropertyNameModelBuilder {
  public static build(rawName: string): PropertyNameModel {
    const isSafe = isNameSafe(rawName);
    const rawNameCode = isSafe ? rawName : `'${rawName}'`;
    const normalizedName = isSafe ? NameFormatter.getParameterName(rawName) : rawName;
    const normalizedNameCode = isSafe ? normalizedName : `'${rawName}'`;
    const rawAccessCode = isSafe ? `.${rawNameCode}` : `[${rawNameCode}]`;
    const normalizedAccessCode = isSafe ? `.${normalizedNameCode}` : `[${normalizedNameCode}]`;

    return {
      rawName,
      rawNameCode,
      rawAccessCode,
      normalizedName,
      normalizedNameCode,
      normalizedAccessCode,
    };
  }
}

function isNameSafe(name: string): boolean {
  return /^[a-zA-Z_][a-zA-Z_0-9]*$/.test(name);
}
