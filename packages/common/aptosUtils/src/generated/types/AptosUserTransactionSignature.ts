import { AptosEd25519SignatureRequest, AptosEd25519SignatureRequestJSON, AptosEd25519SignatureRequestInput } from '../types/AptosEd25519SignatureRequest';
import { AptosMultiEd25519SignatureRequest, AptosMultiEd25519SignatureRequestJSON, AptosMultiEd25519SignatureRequestInput } from '../types/AptosMultiEd25519SignatureRequest';
import { AptosMultiAgentSignatureRequest, AptosMultiAgentSignatureRequestJSON, AptosMultiAgentSignatureRequestInput } from '../types/AptosMultiAgentSignatureRequest';

// $ref: #/components/schemas/UserTransaction/properties/signature
// typeName: UserTransaction_signature
// unionType: oneOf

export type AptosUserTransactionSignatureJSON = AptosEd25519SignatureRequestJSON | AptosMultiEd25519SignatureRequestJSON | AptosMultiAgentSignatureRequestJSON;
export type AptosUserTransactionSignatureInput = AptosEd25519SignatureRequestInput | AptosMultiEd25519SignatureRequestInput | AptosMultiAgentSignatureRequestInput;
export type AptosUserTransactionSignatureValue = AptosEd25519SignatureRequest | AptosMultiEd25519SignatureRequest | AptosMultiAgentSignatureRequest;

export abstract class AptosUserTransactionSignature {
  public static create(input: AptosUserTransactionSignatureInput): AptosUserTransactionSignatureValue {
    if (AptosEd25519SignatureRequest.isInput(input)) {
      return AptosEd25519SignatureRequest.create(input);
    }
    if (AptosMultiEd25519SignatureRequest.isInput(input)) {
      return AptosMultiEd25519SignatureRequest.create(input);
    }
    if (AptosMultiAgentSignatureRequest.isInput(input)) {
      return AptosMultiAgentSignatureRequest.create(input);
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosUserTransactionSignatureJSON): AptosUserTransactionSignatureValue {
    if (AptosEd25519SignatureRequest.isJSON(json)) {
      return AptosEd25519SignatureRequest.fromJSON(json);
    }
    if (AptosMultiEd25519SignatureRequest.isJSON(json)) {
      return AptosMultiEd25519SignatureRequest.fromJSON(json);
    }
    if (AptosMultiAgentSignatureRequest.isJSON(json)) {
      return AptosMultiAgentSignatureRequest.fromJSON(json);
    }
    throw new Error(`Cannot resolve union for AptosUserTransactionSignature (keys: ${Object.keys(json).join(',') })`);
  }
}
