import { AptosEd25519SignatureRequest, AptosEd25519SignatureRequestJSON, AptosEd25519SignatureRequestInput } from '../types/AptosEd25519SignatureRequest';
import { AptosMultiEd25519SignatureRequest, AptosMultiEd25519SignatureRequestJSON, AptosMultiEd25519SignatureRequestInput } from '../types/AptosMultiEd25519SignatureRequest';

// $ref: #/components/schemas/MultiAgentSignatureRequest/properties/secondary_signers
// typeName: MultiAgentSignatureRequest_secondary_signers
// unionType: oneOf

export type AptosMultiAgentSignatureRequestSecondarySignersJSON = AptosEd25519SignatureRequestJSON | AptosMultiEd25519SignatureRequestJSON;
export type AptosMultiAgentSignatureRequestSecondarySignersInput = AptosEd25519SignatureRequestInput | AptosMultiEd25519SignatureRequestInput;
export type AptosMultiAgentSignatureRequestSecondarySignersValue = AptosEd25519SignatureRequest | AptosMultiEd25519SignatureRequest;

export abstract class AptosMultiAgentSignatureRequestSecondarySigners {
  public static create(input: AptosMultiAgentSignatureRequestSecondarySignersInput): AptosMultiAgentSignatureRequestSecondarySignersValue {
    if (AptosEd25519SignatureRequest.isInput(input)) {
      return AptosEd25519SignatureRequest.create(input);
    }
    if (AptosMultiEd25519SignatureRequest.isInput(input)) {
      return AptosMultiEd25519SignatureRequest.create(input);
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosMultiAgentSignatureRequestSecondarySignersJSON): AptosMultiAgentSignatureRequestSecondarySignersValue {
    if (AptosEd25519SignatureRequest.isJSON(json)) {
      return AptosEd25519SignatureRequest.fromJSON(json);
    }
    if (AptosMultiEd25519SignatureRequest.isJSON(json)) {
      return AptosMultiEd25519SignatureRequest.fromJSON(json);
    }
    throw new Error(`Cannot resolve union for AptosMultiAgentSignatureRequestSecondarySigners (keys: ${Object.keys(json).join(',') })`);
  }
}
