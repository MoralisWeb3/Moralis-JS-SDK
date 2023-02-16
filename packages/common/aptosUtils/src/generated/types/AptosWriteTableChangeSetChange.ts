import { AptosDecodedTableData, AptosDecodedTableDataInput, AptosDecodedTableDataJSON } from '../types/AptosDecodedTableData';

// $ref: #/components/schemas/WriteTableChangeSetChange
// type: WriteTableChangeSetChange
// properties:
// - type ($ref: #/components/schemas/WriteTableChangeSetChange/properties/type)
// - address ($ref: #/components/schemas/WriteTableChangeSetChange/properties/address)
// - state_key_hash ($ref: #/components/schemas/WriteTableChangeSetChange/properties/state_key_hash)
// - handle ($ref: #/components/schemas/WriteTableChangeSetChange/properties/handle)
// - key ($ref: #/components/schemas/WriteTableChangeSetChange/properties/key)
// - value ($ref: #/components/schemas/WriteTableChangeSetChange/properties/value)
// - data ($ref: #/components/schemas/DecodedTableData)

export interface AptosWriteTableChangeSetChangeJSON {
  readonly type: string;
  readonly address: string;
  readonly state_key_hash: string;
  readonly handle: string;
  readonly key: string;
  readonly value: string;
  readonly data: AptosDecodedTableDataJSON;
}

export interface AptosWriteTableChangeSetChangeInput {
  readonly type: string;
  readonly address: string;
  readonly stateKeyHash: string;
  readonly handle: string;
  readonly key: string;
  readonly value: string;
  readonly data: AptosDecodedTableDataInput | AptosDecodedTableData;
}

export class AptosWriteTableChangeSetChange {
  public static create(input: AptosWriteTableChangeSetChangeInput | AptosWriteTableChangeSetChange): AptosWriteTableChangeSetChange {
    if (input instanceof AptosWriteTableChangeSetChange) {
      return input;
    }
    return new AptosWriteTableChangeSetChange(input);
  }

  public static fromJSON(json: AptosWriteTableChangeSetChangeJSON): AptosWriteTableChangeSetChange {
    const input: AptosWriteTableChangeSetChangeInput = {
      type: json.type,
      address: json.address,
      stateKeyHash: json.state_key_hash,
      handle: json.handle,
      key: json.key,
      value: json.value,
      data: AptosDecodedTableData.fromJSON(json.data),
    };
    return AptosWriteTableChangeSetChange.create(input);
  }

  public static isInput(input: any): input is AptosWriteTableChangeSetChangeInput {
    return ["type","address","stateKeyHash","handle","key","value","data"].every((name) => input[name] !== undefined);
  }

  public static isJSON(json: any): json is AptosWriteTableChangeSetChangeJSON {
    return ["type","address","state_key_hash","handle","key","value","data"].every((name) => json[name] !== undefined);
  }

  public readonly type: string;
  /**
   * @description A hex encoded 32 byte Aptos account address.
   */
  public readonly address: string;
  /**
   * @description State key hash
   */
  public readonly stateKeyHash: string;
  /**
   * @description All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte.
   */
  public readonly handle: string;
  /**
   * @description All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte.
   */
  public readonly key: string;
  /**
   * @description All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte.
   */
  public readonly value: string;
  public readonly data: AptosDecodedTableData;

  private constructor(input: AptosWriteTableChangeSetChangeInput) {
    this.type = input.type;
    this.address = input.address;
    this.stateKeyHash = input.stateKeyHash;
    this.handle = input.handle;
    this.key = input.key;
    this.value = input.value;
    this.data = AptosDecodedTableData.create(input.data);
  }

  public toJSON(): AptosWriteTableChangeSetChangeJSON {
    return {
      type: this.type,
      address: this.address,
      state_key_hash: this.stateKeyHash,
      handle: this.handle,
      key: this.key,
      value: this.value,
      data: this.data.toJSON(),
    }
  }
}
