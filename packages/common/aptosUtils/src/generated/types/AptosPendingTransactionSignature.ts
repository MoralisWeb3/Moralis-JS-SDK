import { AptosEd25519SignatureRequest, AptosEd25519SignatureRequestJSON, AptosEd25519SignatureRequestInput } from '../types/AptosEd25519SignatureRequest';
import { AptosMultiEd25519SignatureRequest, AptosMultiEd25519SignatureRequestJSON, AptosMultiEd25519SignatureRequestInput } from '../types/AptosMultiEd25519SignatureRequest';
import { AptosMultiAgentSignatureRequest, AptosMultiAgentSignatureRequestJSON, AptosMultiAgentSignatureRequestInput } from '../types/AptosMultiAgentSignatureRequest';

// $ref: #/components/schemas/PendingTransaction/properties/signature
// typeName: PendingTransaction_signature
// unionType: oneOf

export type AptosPendingTransactionSignatureJSON = AptosEd25519SignatureRequestJSON | AptosMultiEd25519SignatureRequestJSON | AptosMultiAgentSignatureRequestJSON;
export type AptosPendingTransactionSignatureInput = AptosEd25519SignatureRequestInput | AptosMultiEd25519SignatureRequestInput | AptosMultiAgentSignatureRequestInput;
export type AptosPendingTransactionSignatureValue = AptosEd25519SignatureRequest | AptosMultiEd25519SignatureRequest | AptosMultiAgentSignatureRequest;

export abstract class AptosPendingTransactionSignature {
  public static create(input: AptosPendingTransactionSignatureInput): AptosPendingTransactionSignatureValue {
    if (AptosEd25519SignatureRequest.isInput(input)) {
      return AptosEd25519SignatureRequest.create(input);
    }
    if (AptosMultiEd25519SignatureRequest.isInput(input)) {
      return AptosMultiEd25519SignatureRequest.create(input);
    }
    if (AptosMultiAgentSignatureRequest.isInput(input)) {
      return AptosMultiAgentSignatureRequest.create(input);
    }
    throw new Error('Cannot resolve union from AptosPendingTransactionSignatureInput');
  }

  public static fromJSON(json: AptosPendingTransactionSignatureJSON): AptosPendingTransactionSignatureValue {
    if (AptosEd25519SignatureRequest.isJSON(json)) {
      return AptosEd25519SignatureRequest.fromJSON(json);
    }
    if (AptosMultiEd25519SignatureRequest.isJSON(json)) {
      return AptosMultiEd25519SignatureRequest.fromJSON(json);
    }
    if (AptosMultiAgentSignatureRequest.isJSON(json)) {
      return AptosMultiAgentSignatureRequest.fromJSON(json);
    }
    const keys = Object.keys(json).join(', ');
    const type = (json as any).type;
    throw new Error(`Cannot resolve union from AptosPendingTransactionSignatureJSON (keys: ${keys}, type: ${type})`);
  }

  public static toJSON(value: AptosPendingTransactionSignatureValue): AptosPendingTransactionSignatureJSON {
    if (value instanceof AptosEd25519SignatureRequest) {
      return value.toJSON();
    }
    if (value instanceof AptosMultiEd25519SignatureRequest) {
      return value.toJSON();
    }
    if (value instanceof AptosMultiAgentSignatureRequest) {
      return value.toJSON();
    }
    throw new Error('Cannot resolve union from AptosPendingTransactionSignatureValue');
  }
}
