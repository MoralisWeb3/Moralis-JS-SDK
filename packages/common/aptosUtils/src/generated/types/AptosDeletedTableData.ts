// $ref: #/components/schemas/DeletedTableData
// type: DeletedTableData
// properties:
// - key ($ref: #/components/schemas/DeletedTableData/properties/key)
// - key_type ($ref: #/components/schemas/DeletedTableData/properties/key_type)

export interface AptosDeletedTableDataJSON {
  readonly key: string;
  readonly key_type: string;
}

export interface AptosDeletedTableDataInput {
  readonly key: string;
  readonly keyType: string;
}

export class AptosDeletedTableData {
  public static create(input: AptosDeletedTableDataInput | AptosDeletedTableData): AptosDeletedTableData {
    if (input instanceof AptosDeletedTableData) {
      return input;
    }
    return new AptosDeletedTableData(input);
  }

  public static fromJSON(json: AptosDeletedTableDataJSON): AptosDeletedTableData {
    const input: AptosDeletedTableDataInput = {
      key: json.key,
      keyType: json.key_type,
    };
    return AptosDeletedTableData.create(input);
  }

  /**
   * @description Deleted key
   */
  public readonly key: string;
  /**
   * @description Deleted key type
   */
  public readonly keyType: string;

  private constructor(input: AptosDeletedTableDataInput) {
    this.key = input.key;
    this.keyType = input.keyType;
  }

  public toJSON(): AptosDeletedTableDataJSON {
    return {
      key: this.key,
      key_type: this.keyType,
    }
  }
}
