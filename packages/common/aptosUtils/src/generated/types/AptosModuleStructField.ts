// $ref: #/components/schemas/ModuleStructField
// type: ModuleStructField
// properties:
// - name ($ref: #/components/schemas/ModuleStructField/properties/name)
// - type ($ref: #/components/schemas/ModuleStructField/properties/type)

export interface AptosModuleStructFieldJSON {
  readonly name: string;
  readonly type: string;
}

export interface AptosModuleStructFieldInput {
  readonly name: string;
  readonly type: string;
}

export class AptosModuleStructField {
  public static create(input: AptosModuleStructFieldInput | AptosModuleStructField): AptosModuleStructField {
    if (input instanceof AptosModuleStructField) {
      return input;
    }
    return new AptosModuleStructField(input);
  }

  public static fromJSON(json: AptosModuleStructFieldJSON): AptosModuleStructField {
    const input: AptosModuleStructFieldInput = {
      name: json.name,
      type: json.type,
    };
    return AptosModuleStructField.create(input);
  }

  /**
   * @description Name of the field
   */
  public readonly name: string;
  /**
   * @description String representation of an on-chain Move type tag that is exposed in transaction payload.
   */
  public readonly type: string;

  private constructor(input: AptosModuleStructFieldInput) {
    this.name = input.name;
    this.type = input.type;
  }

  public toJSON(): AptosModuleStructFieldJSON {
    return {
      name: this.name,
      type: this.type,
    }
  }
}
