import { AptosDeleteResourceChangeResource, AptosDeleteResourceChangeResourceValue, AptosDeleteResourceChangeResourceInput, AptosDeleteResourceChangeResourceJSON } from '../types/AptosDeleteResourceChangeResource';

// $ref: #/components/schemas/DeleteResourceChange
// type: DeleteResourceChange
// properties:
// - type ($ref: #/components/schemas/DeleteResourceChange/properties/type)
// - address ($ref: #/components/schemas/DeleteResourceChange/properties/address)
// - state_key_hash ($ref: #/components/schemas/DeleteResourceChange/properties/state_key_hash)
// - resource ($ref: #/components/schemas/DeleteResourceChange/properties/resource)

export interface AptosDeleteResourceChangeJSON {
  readonly type: string;
  readonly address: string;
  readonly state_key_hash: string;
  readonly resource: AptosDeleteResourceChangeResourceJSON;
}

export interface AptosDeleteResourceChangeInput {
  readonly type: string;
  readonly address: string;
  readonly stateKeyHash: string;
  readonly resource: AptosDeleteResourceChangeResourceInput | AptosDeleteResourceChangeResourceValue;
}

export class AptosDeleteResourceChange {
  public static create(input: AptosDeleteResourceChangeInput | AptosDeleteResourceChange): AptosDeleteResourceChange {
    if (input instanceof AptosDeleteResourceChange) {
      return input;
    }
    return new AptosDeleteResourceChange(input);
  }

  public static fromJSON(json: AptosDeleteResourceChangeJSON): AptosDeleteResourceChange {
    const input: AptosDeleteResourceChangeInput = {
      type: json.type,
      address: json.address,
      stateKeyHash: json.state_key_hash,
      resource: AptosDeleteResourceChangeResource.fromJSON(json.resource),
    };
    return AptosDeleteResourceChange.create(input);
  }

  public static isInput(input: any): input is AptosDeleteResourceChangeInput {
    return input.type === 'TODO';
  }

  public static isJSON(json: any): json is AptosDeleteResourceChangeJSON {
    return json.type === 'TODO';
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
   * @description String representation of a MoveStructTag (on-chain Move struct type).
   */
  public readonly resource: AptosDeleteResourceChangeResourceValue;

  private constructor(input: AptosDeleteResourceChangeInput) {
    this.type = input.type;
    this.address = input.address;
    this.stateKeyHash = input.stateKeyHash;
    this.resource = AptosDeleteResourceChangeResource.create(input.resource);
  }

  public toJSON(): AptosDeleteResourceChangeJSON {
    return {
      type: this.type,
      address: this.address,
      state_key_hash: this.stateKeyHash,
      resource: this.resource,
    }
  }
}
