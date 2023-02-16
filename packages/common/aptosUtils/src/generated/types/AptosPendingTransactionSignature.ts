import { AptosEd25519SignatureRequest, AptosEd25519SignatureRequestJSON, AptosEd25519SignatureRequestInput } from '../types/AptosEd25519SignatureRequest';
import { AptosMultiEd25519SignatureRequest, AptosMultiEd25519SignatureRequestJSON, AptosMultiEd25519SignatureRequestInput } from '../types/AptosMultiEd25519SignatureRequest';
import { AptosMultiAgentSignatureRequest, AptosMultiAgentSignatureRequestJSON, AptosMultiAgentSignatureRequestInput } from '../types/AptosMultiAgentSignatureRequest';

// $ref: #/components/schemas/PendingTransaction/properties/signature
// typeName: PendingTransaction_signature
// unionType: oneOf

export type AptosPendingTransactionSignatureJSON = AptosEd25519SignatureRequestJSON | AptosMultiEd25519SignatureRequestJSON | AptosMultiAgentSignatureRequestJSON;
export type AptosPendingTransactionSignatureInput = AptosEd25519SignatureRequestInput | AptosMultiEd25519SignatureRequestInput | AptosMultiAgentSignatureRequestInput;

export class AptosPendingTransactionSignature {
  public static create(input: AptosPendingTransactionSignatureInput | AptosPendingTransactionSignature): AptosPendingTransactionSignature {
    if (input instanceof AptosPendingTransactionSignature) {
      return input;
    }
    if (AptosEd25519SignatureRequest.isInput(input)) {
      return new AptosPendingTransactionSignature(AptosEd25519SignatureRequest.create(input));
    }
    if (AptosMultiEd25519SignatureRequest.isInput(input)) {
      return new AptosPendingTransactionSignature(AptosMultiEd25519SignatureRequest.create(input));
    }
    if (AptosMultiAgentSignatureRequest.isInput(input)) {
      return new AptosPendingTransactionSignature(AptosMultiAgentSignatureRequest.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosPendingTransactionSignatureJSON): AptosPendingTransactionSignature {
    if (AptosEd25519SignatureRequest.isJSON(json)) {
      return new AptosPendingTransactionSignature(AptosEd25519SignatureRequest.fromJSON(json));
    }
    if (AptosMultiEd25519SignatureRequest.isJSON(json)) {
      return new AptosPendingTransactionSignature(AptosMultiEd25519SignatureRequest.fromJSON(json));
    }
    if (AptosMultiAgentSignatureRequest.isJSON(json)) {
      return new AptosPendingTransactionSignature(AptosMultiAgentSignatureRequest.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosPendingTransactionSignature (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosEd25519SignatureRequest | AptosMultiEd25519SignatureRequest | AptosMultiAgentSignatureRequest) {}

  public toJSON(): AptosPendingTransactionSignatureJSON {
    if (this.value instanceof AptosEd25519SignatureRequest) {
      return this.value.toJSON();
    }
    if (this.value instanceof AptosMultiEd25519SignatureRequest) {
      return this.value.toJSON();
    }
    if (this.value instanceof AptosMultiAgentSignatureRequest) {
      return this.value.toJSON();
    }
    throw new Error('Invalid value');
  }
}
