import { AptosDeleteTableItemChangeAddress, AptosDeleteTableItemChangeAddressValue, AptosDeleteTableItemChangeAddressInput, AptosDeleteTableItemChangeAddressJSON } from '../types/AptosDeleteTableItemChangeAddress';
import { AptosDeleteTableItemChangeHandle, AptosDeleteTableItemChangeHandleValue, AptosDeleteTableItemChangeHandleInput, AptosDeleteTableItemChangeHandleJSON } from '../types/AptosDeleteTableItemChangeHandle';
import { AptosDeleteTableItemChangeKey, AptosDeleteTableItemChangeKeyValue, AptosDeleteTableItemChangeKeyInput, AptosDeleteTableItemChangeKeyJSON } from '../types/AptosDeleteTableItemChangeKey';
import { AptosDeletedTableData, AptosDeletedTableDataInput, AptosDeletedTableDataJSON } from '../types/AptosDeletedTableData';

// $ref: #/components/schemas/DeleteTableItemChange
// type: DeleteTableItemChange
// properties:
// - type ($ref: #/components/schemas/DeleteTableItemChange/properties/type)
// - address ($ref: #/components/schemas/DeleteTableItemChange/properties/address)
// - state_key_hash ($ref: #/components/schemas/DeleteTableItemChange/properties/state_key_hash)
// - handle ($ref: #/components/schemas/DeleteTableItemChange/properties/handle)
// - key ($ref: #/components/schemas/DeleteTableItemChange/properties/key)
// - data ($ref: #/components/schemas/DeletedTableData)

export interface AptosDeleteTableItemChangeJSON {
  readonly type: string;
  readonly address: AptosDeleteTableItemChangeAddressJSON;
  readonly state_key_hash: string;
  readonly handle: AptosDeleteTableItemChangeHandleJSON;
  readonly key: AptosDeleteTableItemChangeKeyJSON;
  readonly data: AptosDeletedTableDataJSON;
}

export interface AptosDeleteTableItemChangeInput {
  readonly type: string;
  readonly address: AptosDeleteTableItemChangeAddressInput | AptosDeleteTableItemChangeAddressValue;
  readonly stateKeyHash: string;
  readonly handle: AptosDeleteTableItemChangeHandleInput | AptosDeleteTableItemChangeHandleValue;
  readonly key: AptosDeleteTableItemChangeKeyInput | AptosDeleteTableItemChangeKeyValue;
  readonly data: AptosDeletedTableDataInput | AptosDeletedTableData;
}

export class AptosDeleteTableItemChange {
  public static create(input: AptosDeleteTableItemChangeInput | AptosDeleteTableItemChange): AptosDeleteTableItemChange {
    if (input instanceof AptosDeleteTableItemChange) {
      return input;
    }
    return new AptosDeleteTableItemChange(input);
  }

  public static fromJSON(json: AptosDeleteTableItemChangeJSON): AptosDeleteTableItemChange {
    const input: AptosDeleteTableItemChangeInput = {
      type: json.type,
      address: AptosDeleteTableItemChangeAddress.fromJSON(json.address),
      stateKeyHash: json.state_key_hash,
      handle: AptosDeleteTableItemChangeHandle.fromJSON(json.handle),
      key: AptosDeleteTableItemChangeKey.fromJSON(json.key),
      data: AptosDeletedTableData.fromJSON(json.data),
    };
    return AptosDeleteTableItemChange.create(input);
  }

  public static isInput(input: any): input is AptosDeleteTableItemChangeInput {
    return ["type","address","stateKeyHash","handle","key","data"].every((name) => input[name] !== undefined);
  }

  public static isJSON(json: any): json is AptosDeleteTableItemChangeJSON {
    return ["type","address","state_key_hash","handle","key","data"].every((name) => json[name] !== undefined);
  }

  public readonly type: string;
  /**
   * @description A hex encoded 32 byte Aptos account address.
   */
  public readonly address: AptosDeleteTableItemChangeAddressValue;
  /**
   * @description State key hash
   */
  public readonly stateKeyHash: string;
  /**
   * @description All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte.
   */
  public readonly handle: AptosDeleteTableItemChangeHandleValue;
  /**
   * @description All bytes (Vec) data is represented as hex-encoded string prefixed with 0x and fulfilled with two hex digits per byte.
   */
  public readonly key: AptosDeleteTableItemChangeKeyValue;
  /**
   * @description Deleted table data
   */
  public readonly data: AptosDeletedTableData;

  private constructor(input: AptosDeleteTableItemChangeInput) {
    this.type = input.type;
    this.address = AptosDeleteTableItemChangeAddress.create(input.address);
    this.stateKeyHash = input.stateKeyHash;
    this.handle = AptosDeleteTableItemChangeHandle.create(input.handle);
    this.key = AptosDeleteTableItemChangeKey.create(input.key);
    this.data = AptosDeletedTableData.create(input.data);
  }

  public toJSON(): AptosDeleteTableItemChangeJSON {
    return {
      type: this.type,
      address: this.address,
      state_key_hash: this.stateKeyHash,
      handle: this.handle,
      key: this.key,
      data: this.data.toJSON(),
    }
  }
}
