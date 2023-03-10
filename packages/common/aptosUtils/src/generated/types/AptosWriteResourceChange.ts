import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosWriteResourceData, AptosWriteResourceDataInput, AptosWriteResourceDataJSON } from '../types/AptosWriteResourceData';

// $ref: #/components/schemas/WriteResourceChange
// type: WriteResourceChange
// properties:
// - type ($ref: #/components/schemas/WriteResourceChange/properties/type)
// - address ($ref: #/components/schemas/WriteResourceChange/properties/address)
// - state_key_hash ($ref: #/components/schemas/WriteResourceChange/properties/state_key_hash)
// - data ($ref: #/components/schemas/WriteResourceData)

export interface AptosWriteResourceChangeJSON {
  readonly type: string;
  readonly address: AptosAddressJSON;
  readonly state_key_hash: string;
  readonly data: AptosWriteResourceDataJSON;
}

export interface AptosWriteResourceChangeInput {
  readonly type: string;
  readonly address: AptosAddressInput | AptosAddress;
  readonly stateKeyHash: string;
  readonly data: AptosWriteResourceDataInput | AptosWriteResourceData;
}

export class AptosWriteResourceChange {
  public static create(input: AptosWriteResourceChangeInput | AptosWriteResourceChange): AptosWriteResourceChange {
    if (input instanceof AptosWriteResourceChange) {
      return input;
    }
    return new AptosWriteResourceChange(input);
  }

  public static fromJSON(json: AptosWriteResourceChangeJSON): AptosWriteResourceChange {
    const input: AptosWriteResourceChangeInput = {
      type: json.type,
      address: AptosAddress.fromJSON(json.address),
      stateKeyHash: json.state_key_hash,
      data: AptosWriteResourceData.fromJSON(json.data),
    };
    return AptosWriteResourceChange.create(input);
  }

  public static isInput(input: any): input is AptosWriteResourceChangeInput {
    return input.type === 'write_resource';
  }

  public static isJSON(json: any): json is AptosWriteResourceChangeJSON {
    return json.type === 'write_resource';
  }

  public readonly type: string;
  /**
   * @description A hex encoded 32 byte Aptos account address.
   */
  public readonly address: AptosAddress;
  /**
   * @description State key hash
   */
  public readonly stateKeyHash: string;
  public readonly data: AptosWriteResourceData;

  private constructor(input: AptosWriteResourceChangeInput) {
    this.type = input.type;
    this.address = AptosAddress.create(input.address);
    this.stateKeyHash = input.stateKeyHash;
    this.data = AptosWriteResourceData.create(input.data);
  }

  public toJSON(): AptosWriteResourceChangeJSON {
    return {
      type: this.type,
      address: this.address.toJSON(),
      state_key_hash: this.stateKeyHash,
      data: this.data.toJSON(),
    }
  }
}
