import { AptosWriteModuleData, AptosWriteModuleDataInput, AptosWriteModuleDataJSON } from '../types/AptosWriteModuleData';

// $ref: #/components/schemas/WriteOrUpdateModuleChange
// type: WriteOrUpdateModuleChange
// properties:
// - type ($ref: #/components/schemas/WriteOrUpdateModuleChange/properties/type)
// - address ($ref: #/components/schemas/WriteOrUpdateModuleChange/properties/address)
// - state_key_hash ($ref: #/components/schemas/WriteOrUpdateModuleChange/properties/state_key_hash)
// - data ($ref: #/components/schemas/WriteModuleData)

export interface AptosWriteOrUpdateModuleChangeJSON {
  readonly type: string;
  readonly address: string;
  readonly state_key_hash: string;
  readonly data: AptosWriteModuleDataJSON;
}

export interface AptosWriteOrUpdateModuleChangeInput {
  readonly type: string;
  readonly address: string;
  readonly stateKeyHash: string;
  readonly data: AptosWriteModuleDataInput | AptosWriteModuleData;
}

export class AptosWriteOrUpdateModuleChange {
  public static create(input: AptosWriteOrUpdateModuleChangeInput | AptosWriteOrUpdateModuleChange): AptosWriteOrUpdateModuleChange {
    if (input instanceof AptosWriteOrUpdateModuleChange) {
      return input;
    }
    return new AptosWriteOrUpdateModuleChange(input);
  }

  public static fromJSON(json: AptosWriteOrUpdateModuleChangeJSON): AptosWriteOrUpdateModuleChange {
    const input: AptosWriteOrUpdateModuleChangeInput = {
      type: json.type,
      address: json.address,
      stateKeyHash: json.state_key_hash,
      data: AptosWriteModuleData.fromJSON(json.data),
    };
    return AptosWriteOrUpdateModuleChange.create(input);
  }

  public static isInput(input: any): input is AptosWriteOrUpdateModuleChangeInput {
    return input.type === 'write_module';
  }

  public static isJSON(json: any): json is AptosWriteOrUpdateModuleChangeJSON {
    return json.type === 'write_module';
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
  public readonly data: AptosWriteModuleData;

  private constructor(input: AptosWriteOrUpdateModuleChangeInput) {
    this.type = input.type;
    this.address = input.address;
    this.stateKeyHash = input.stateKeyHash;
    this.data = AptosWriteModuleData.create(input.data);
  }

  public toJSON(): AptosWriteOrUpdateModuleChangeJSON {
    return {
      type: this.type,
      address: this.address,
      state_key_hash: this.stateKeyHash,
      data: this.data.toJSON(),
    }
  }
}
