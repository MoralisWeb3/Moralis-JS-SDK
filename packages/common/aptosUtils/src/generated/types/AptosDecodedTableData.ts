// $ref: #/components/schemas/DecodedTableData
// type: DecodedTableData
// properties:
// - key ($ref: #/components/schemas/DecodedTableData/properties/key)
// - key_type ($ref: #/components/schemas/DecodedTableData/properties/key_type)
// - value ($ref: #/components/schemas/DecodedTableData/properties/value)
// - value_type ($ref: #/components/schemas/DecodedTableData/properties/value_type)

export interface AptosDecodedTableDataJSON {
  readonly key: string;
  readonly key_type: string;
  readonly value: string;
  readonly value_type: string;
}

export interface AptosDecodedTableDataInput {
  readonly key: string;
  readonly keyType: string;
  readonly value: string;
  readonly valueType: string;
}

export class AptosDecodedTableData {
  public static create(input: AptosDecodedTableDataInput | AptosDecodedTableData): AptosDecodedTableData {
    if (input instanceof AptosDecodedTableData) {
      return input;
    }
    return new AptosDecodedTableData(input);
  }

  public static fromJSON(json: AptosDecodedTableDataJSON): AptosDecodedTableData {
    const input: AptosDecodedTableDataInput = {
      key: json.key,
      keyType: json.key_type,
      value: json.value,
      valueType: json.value_type,
    };
    return AptosDecodedTableData.create(input);
  }

  /**
   * @description Key of table in JSON
   */
  public readonly key: string;
  /**
   * @description Type of key
   */
  public readonly keyType: string;
  /**
   * @description Value of table in JSON
   */
  public readonly value: string;
  /**
   * @description Type of value
   */
  public readonly valueType: string;

  private constructor(input: AptosDecodedTableDataInput) {
    this.key = input.key;
    this.keyType = input.keyType;
    this.value = input.value;
    this.valueType = input.valueType;
  }

  public toJSON(): AptosDecodedTableDataJSON {
    return {
      key: this.key,
      key_type: this.keyType,
      value: this.value,
      value_type: this.valueType,
    }
  }
}
