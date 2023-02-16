import { AptosEd25519SignatureRequest, AptosEd25519SignatureRequestJSON, AptosEd25519SignatureRequestInput } from '../types/AptosEd25519SignatureRequest';
import { AptosMultiEd25519SignatureRequest, AptosMultiEd25519SignatureRequestJSON, AptosMultiEd25519SignatureRequestInput } from '../types/AptosMultiEd25519SignatureRequest';
import { AptosMultiAgentSignatureRequest, AptosMultiAgentSignatureRequestJSON, AptosMultiAgentSignatureRequestInput } from '../types/AptosMultiAgentSignatureRequest';

// $ref: #/components/schemas/SubmitTransactionRequest/properties/signature
// typeName: SubmitTransactionRequest_signature
// unionType: oneOf

export type AptosSubmitTransactionRequestSignatureJSON = AptosEd25519SignatureRequestJSON | AptosMultiEd25519SignatureRequestJSON | AptosMultiAgentSignatureRequestJSON;
export type AptosSubmitTransactionRequestSignatureInput = AptosEd25519SignatureRequestInput | AptosMultiEd25519SignatureRequestInput | AptosMultiAgentSignatureRequestInput;

export class AptosSubmitTransactionRequestSignature {
  public static create(input: AptosSubmitTransactionRequestSignatureInput | AptosSubmitTransactionRequestSignature): AptosSubmitTransactionRequestSignature {
    if (input instanceof AptosSubmitTransactionRequestSignature) {
      return input;
    }
    if (AptosEd25519SignatureRequest.isInput(input)) {
      return new AptosSubmitTransactionRequestSignature(AptosEd25519SignatureRequest.create(input));
    }
    if (AptosMultiEd25519SignatureRequest.isInput(input)) {
      return new AptosSubmitTransactionRequestSignature(AptosMultiEd25519SignatureRequest.create(input));
    }
    if (AptosMultiAgentSignatureRequest.isInput(input)) {
      return new AptosSubmitTransactionRequestSignature(AptosMultiAgentSignatureRequest.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosSubmitTransactionRequestSignatureJSON): AptosSubmitTransactionRequestSignature {
    if (AptosEd25519SignatureRequest.isJSON(json)) {
      return new AptosSubmitTransactionRequestSignature(AptosEd25519SignatureRequest.fromJSON(json));
    }
    if (AptosMultiEd25519SignatureRequest.isJSON(json)) {
      return new AptosSubmitTransactionRequestSignature(AptosMultiEd25519SignatureRequest.fromJSON(json));
    }
    if (AptosMultiAgentSignatureRequest.isJSON(json)) {
      return new AptosSubmitTransactionRequestSignature(AptosMultiAgentSignatureRequest.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosSubmitTransactionRequestSignature (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosEd25519SignatureRequest | AptosMultiEd25519SignatureRequest | AptosMultiAgentSignatureRequest) {}

  public toJSON(): AptosSubmitTransactionRequestSignatureJSON {
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
