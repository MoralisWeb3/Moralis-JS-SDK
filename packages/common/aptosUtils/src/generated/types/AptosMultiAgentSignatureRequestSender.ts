import { AptosEd25519SignatureRequest, AptosEd25519SignatureRequestJSON, AptosEd25519SignatureRequestInput } from '../types/AptosEd25519SignatureRequest';
import { AptosMultiEd25519SignatureRequest, AptosMultiEd25519SignatureRequestJSON, AptosMultiEd25519SignatureRequestInput } from '../types/AptosMultiEd25519SignatureRequest';

// $ref: #/components/schemas/MultiAgentSignatureRequest/properties/sender
// typeName: MultiAgentSignatureRequest_sender
// unionType: oneOf

export type AptosMultiAgentSignatureRequestSenderJSON = AptosEd25519SignatureRequestJSON | AptosMultiEd25519SignatureRequestJSON;
export type AptosMultiAgentSignatureRequestSenderInput = AptosEd25519SignatureRequestInput | AptosMultiEd25519SignatureRequestInput;
export type AptosMultiAgentSignatureRequestSenderValue = AptosEd25519SignatureRequest | AptosMultiEd25519SignatureRequest;

export abstract class AptosMultiAgentSignatureRequestSender {
  public static create(input: AptosMultiAgentSignatureRequestSenderInput): AptosMultiAgentSignatureRequestSenderValue {
    if (AptosEd25519SignatureRequest.isInput(input)) {
      return AptosEd25519SignatureRequest.create(input);
    }
    if (AptosMultiEd25519SignatureRequest.isInput(input)) {
      return AptosMultiEd25519SignatureRequest.create(input);
    }
    throw new Error('Cannot resolve union from AptosMultiAgentSignatureRequestSenderInput');
  }

  public static fromJSON(json: AptosMultiAgentSignatureRequestSenderJSON): AptosMultiAgentSignatureRequestSenderValue {
    if (AptosEd25519SignatureRequest.isJSON(json)) {
      return AptosEd25519SignatureRequest.fromJSON(json);
    }
    if (AptosMultiEd25519SignatureRequest.isJSON(json)) {
      return AptosMultiEd25519SignatureRequest.fromJSON(json);
    }
    const keys = Object.keys(json).join(', ');
    const type = (json as any).type;
    throw new Error(`Cannot resolve union from AptosMultiAgentSignatureRequestSenderJSON (keys: ${keys}, type: ${type})`);
  }

  public static toJSON(value: AptosMultiAgentSignatureRequestSenderValue): AptosMultiAgentSignatureRequestSenderJSON {
    if (value instanceof AptosEd25519SignatureRequest) {
      return value.toJSON();
    }
    if (value instanceof AptosMultiEd25519SignatureRequest) {
      return value.toJSON();
    }
    throw new Error('Cannot resolve union from AptosMultiAgentSignatureRequestSenderValue');
  }
}
