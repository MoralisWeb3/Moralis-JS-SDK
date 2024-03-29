import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosDeleteModuleChangeModule, AptosDeleteModuleChangeModuleValue, AptosDeleteModuleChangeModuleInput, AptosDeleteModuleChangeModuleJSON } from '../types/AptosDeleteModuleChangeModule';

// $ref: #/components/schemas/DeleteModuleChange
// type: DeleteModuleChange
// properties:
// - type ($ref: #/components/schemas/DeleteModuleChange/properties/type)
// - address ($ref: #/components/schemas/DeleteModuleChange/properties/address)
// - state_key_hash ($ref: #/components/schemas/DeleteModuleChange/properties/state_key_hash)
// - module ($ref: #/components/schemas/DeleteModuleChange/properties/module)

export interface AptosDeleteModuleChangeJSON {
  readonly type: string;
  readonly address: AptosAddressJSON;
  readonly state_key_hash: string;
  readonly module: AptosDeleteModuleChangeModuleJSON;
}

export interface AptosDeleteModuleChangeInput {
  readonly type: string;
  readonly address: AptosAddressInput | AptosAddress;
  readonly stateKeyHash: string;
  readonly module: AptosDeleteModuleChangeModuleInput | AptosDeleteModuleChangeModuleValue;
}

export class AptosDeleteModuleChange {
  public static create(input: AptosDeleteModuleChangeInput | AptosDeleteModuleChange): AptosDeleteModuleChange {
    if (input instanceof AptosDeleteModuleChange) {
      return input;
    }
    return new AptosDeleteModuleChange(input);
  }

  public static fromJSON(json: AptosDeleteModuleChangeJSON): AptosDeleteModuleChange {
    const input: AptosDeleteModuleChangeInput = {
      type: json.type,
      address: AptosAddress.fromJSON(json.address),
      stateKeyHash: json.state_key_hash,
      module: AptosDeleteModuleChangeModule.fromJSON(json.module),
    };
    return AptosDeleteModuleChange.create(input);
  }

  public static isInput(input: any): input is AptosDeleteModuleChangeInput {
    return input.type === 'delete_module';
  }

  public static isJSON(json: any): json is AptosDeleteModuleChangeJSON {
    return json.type === 'delete_module';
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
  /**
   * @description Move module id is a string representation of Move module
   */
  public readonly module: AptosDeleteModuleChangeModuleValue;

  private constructor(input: AptosDeleteModuleChangeInput) {
    this.type = input.type;
    this.address = AptosAddress.create(input.address);
    this.stateKeyHash = input.stateKeyHash;
    this.module = AptosDeleteModuleChangeModule.create(input.module);
  }

  public toJSON(): AptosDeleteModuleChangeJSON {
    return {
      type: this.type,
      address: this.address.toJSON(),
      state_key_hash: this.stateKeyHash,
      module: this.module,
    }
  }
}
