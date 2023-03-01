import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosMultiAgentSignatureRequestSecondarySigners, AptosMultiAgentSignatureRequestSecondarySignersValue, AptosMultiAgentSignatureRequestSecondarySignersInput, AptosMultiAgentSignatureRequestSecondarySignersJSON } from '../types/AptosMultiAgentSignatureRequestSecondarySigners';

// $ref: #/components/schemas/MultiAgentSignatureRequest
// type: MultiAgentSignatureRequest
// properties:
// - type ($ref: #/components/schemas/MultiAgentSignatureRequest/properties/type)
// - sender ($ref: #/components/schemas/MultiAgentSignatureRequest/properties/sender)
// - secondary_signer_addresses ($ref: #/components/schemas/MultiAgentSignatureRequest/properties/secondary_signer_addresses)
// - secondary_signers ($ref: #/components/schemas/MultiAgentSignatureRequest/properties/secondary_signers)

export interface AptosMultiAgentSignatureRequestJSON {
  readonly type: string;
  readonly sender: AptosAddressJSON;
  readonly secondary_signer_addresses: string[];
  readonly secondary_signers: AptosMultiAgentSignatureRequestSecondarySignersJSON;
}

export interface AptosMultiAgentSignatureRequestInput {
  readonly type: string;
  readonly sender: AptosAddressInput | AptosAddress;
  readonly secondarySignerAddresses: string[];
  readonly secondarySigners: AptosMultiAgentSignatureRequestSecondarySignersInput | AptosMultiAgentSignatureRequestSecondarySignersValue;
}

export class AptosMultiAgentSignatureRequest {
  public static create(input: AptosMultiAgentSignatureRequestInput | AptosMultiAgentSignatureRequest): AptosMultiAgentSignatureRequest {
    if (input instanceof AptosMultiAgentSignatureRequest) {
      return input;
    }
    return new AptosMultiAgentSignatureRequest(input);
  }

  public static fromJSON(json: AptosMultiAgentSignatureRequestJSON): AptosMultiAgentSignatureRequest {
    const input: AptosMultiAgentSignatureRequestInput = {
      type: json.type,
      sender: AptosAddress.fromJSON(json.sender),
      secondarySignerAddresses: json.secondary_signer_addresses,
      secondarySigners: AptosMultiAgentSignatureRequestSecondarySigners.fromJSON(json.secondary_signers),
    };
    return AptosMultiAgentSignatureRequest.create(input);
  }

  public static isInput(input: any): input is AptosMultiAgentSignatureRequestInput {
    return ["type","sender","secondarySignerAddresses","secondarySigners"].every((name) => input[name] !== undefined);
  }

  public static isJSON(json: any): json is AptosMultiAgentSignatureRequestJSON {
    return ["type","sender","secondary_signer_addresses","secondary_signers"].every((name) => json[name] !== undefined);
  }

  public readonly type: string;
  public readonly sender: AptosAddress;
  /**
   * @description The other involved parties addresses
   */
  public readonly secondarySignerAddresses: string[];
  public readonly secondarySigners: AptosMultiAgentSignatureRequestSecondarySignersValue;

  private constructor(input: AptosMultiAgentSignatureRequestInput) {
    this.type = input.type;
    this.sender = AptosAddress.create(input.sender);
    this.secondarySignerAddresses = input.secondarySignerAddresses;
    this.secondarySigners = AptosMultiAgentSignatureRequestSecondarySigners.create(input.secondarySigners);
  }

  public toJSON(): AptosMultiAgentSignatureRequestJSON {
    return {
      type: this.type,
      sender: this.sender.toJSON(),
      secondary_signer_addresses: this.secondarySignerAddresses,
      secondary_signers: this.secondarySigners.toJSON(),
    }
  }
}
