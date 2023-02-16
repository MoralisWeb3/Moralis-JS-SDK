import { AptosEd25519SignatureRequest, AptosEd25519SignatureRequestJSON, AptosEd25519SignatureRequestInput } from '../types/AptosEd25519SignatureRequest';
import { AptosMultiEd25519SignatureRequest, AptosMultiEd25519SignatureRequestJSON, AptosMultiEd25519SignatureRequestInput } from '../types/AptosMultiEd25519SignatureRequest';

// $ref: #/components/schemas/MultiAgentSignatureRequest/properties/sender
// typeName: MultiAgentSignatureRequest_sender
// unionType: oneOf

export type AptosMultiAgentSignatureRequestSenderJSON = AptosEd25519SignatureRequestJSON | AptosMultiEd25519SignatureRequestJSON;
export type AptosMultiAgentSignatureRequestSenderInput = AptosEd25519SignatureRequestInput | AptosMultiEd25519SignatureRequestInput;

export class AptosMultiAgentSignatureRequestSender {
  public static create(input: AptosMultiAgentSignatureRequestSenderInput | AptosMultiAgentSignatureRequestSender): AptosMultiAgentSignatureRequestSender {
    if (input instanceof AptosMultiAgentSignatureRequestSender) {
      return input;
    }
    if (AptosEd25519SignatureRequest.isInput(input)) {
      return new AptosMultiAgentSignatureRequestSender(AptosEd25519SignatureRequest.create(input));
    }
    if (AptosMultiEd25519SignatureRequest.isInput(input)) {
      return new AptosMultiAgentSignatureRequestSender(AptosMultiEd25519SignatureRequest.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosMultiAgentSignatureRequestSenderJSON): AptosMultiAgentSignatureRequestSender {
    if (AptosEd25519SignatureRequest.isJSON(json)) {
      return new AptosMultiAgentSignatureRequestSender(AptosEd25519SignatureRequest.fromJSON(json));
    }
    if (AptosMultiEd25519SignatureRequest.isJSON(json)) {
      return new AptosMultiAgentSignatureRequestSender(AptosMultiEd25519SignatureRequest.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosMultiAgentSignatureRequestSender (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosEd25519SignatureRequest | AptosMultiEd25519SignatureRequest) {}

  public toJSON(): AptosMultiAgentSignatureRequestSenderJSON {
    if (this.value instanceof AptosEd25519SignatureRequest) {
      return this.value.toJSON();
    }
    if (this.value instanceof AptosMultiEd25519SignatureRequest) {
      return this.value.toJSON();
    }
    throw new Error('Invalid value');
  }
}
