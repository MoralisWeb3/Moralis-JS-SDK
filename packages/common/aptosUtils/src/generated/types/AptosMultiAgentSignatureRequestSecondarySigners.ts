import { AptosEd25519SignatureRequest, AptosEd25519SignatureRequestJSON, AptosEd25519SignatureRequestInput } from '../types/AptosEd25519SignatureRequest';
import { AptosMultiEd25519SignatureRequest, AptosMultiEd25519SignatureRequestJSON, AptosMultiEd25519SignatureRequestInput } from '../types/AptosMultiEd25519SignatureRequest';

// $ref: #/components/schemas/MultiAgentSignatureRequest/properties/secondary_signers
// typeName: MultiAgentSignatureRequest_secondary_signers
// unionType: oneOf

export type AptosMultiAgentSignatureRequestSecondarySignersJSON = AptosEd25519SignatureRequestJSON | AptosMultiEd25519SignatureRequestJSON;
export type AptosMultiAgentSignatureRequestSecondarySignersInput = AptosEd25519SignatureRequestInput | AptosMultiEd25519SignatureRequestInput;

export class AptosMultiAgentSignatureRequestSecondarySigners {
  public static create(input: AptosMultiAgentSignatureRequestSecondarySignersInput | AptosMultiAgentSignatureRequestSecondarySigners): AptosMultiAgentSignatureRequestSecondarySigners {
    if (input instanceof AptosMultiAgentSignatureRequestSecondarySigners) {
      return input;
    }
    if (AptosEd25519SignatureRequest.isInput(input)) {
      return new AptosMultiAgentSignatureRequestSecondarySigners(AptosEd25519SignatureRequest.create(input));
    }
    if (AptosMultiEd25519SignatureRequest.isInput(input)) {
      return new AptosMultiAgentSignatureRequestSecondarySigners(AptosMultiEd25519SignatureRequest.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosMultiAgentSignatureRequestSecondarySignersJSON): AptosMultiAgentSignatureRequestSecondarySigners {
    if (AptosEd25519SignatureRequest.isJSON(json)) {
      return new AptosMultiAgentSignatureRequestSecondarySigners(AptosEd25519SignatureRequest.fromJSON(json));
    }
    if (AptosMultiEd25519SignatureRequest.isJSON(json)) {
      return new AptosMultiAgentSignatureRequestSecondarySigners(AptosMultiEd25519SignatureRequest.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosMultiAgentSignatureRequestSecondarySigners (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosEd25519SignatureRequest | AptosMultiEd25519SignatureRequest) {}

  public toJSON(): AptosMultiAgentSignatureRequestSecondarySignersJSON {
    if (this.value instanceof AptosEd25519SignatureRequest) {
      return this.value.toJSON();
    }
    if (this.value instanceof AptosMultiEd25519SignatureRequest) {
      return this.value.toJSON();
    }
    throw new Error('Invalid value');
  }
}
