import { AptosEntryFunctionPayloadRequest, AptosEntryFunctionPayloadRequestJSON, AptosEntryFunctionPayloadRequestInput } from '../types/AptosEntryFunctionPayloadRequest';
import { AptosScriptPayloadRequest, AptosScriptPayloadRequestJSON, AptosScriptPayloadRequestInput } from '../types/AptosScriptPayloadRequest';
import { AptosModuleBundlePayloadRequest, AptosModuleBundlePayloadRequestJSON, AptosModuleBundlePayloadRequestInput } from '../types/AptosModuleBundlePayloadRequest';

// $ref: #/components/schemas/SubmitTransactionRequest/properties/payload
// typeName: SubmitTransactionRequest_payload
// unionType: oneOf

export type AptosSubmitTransactionRequestPayloadJSON = AptosEntryFunctionPayloadRequestJSON | AptosScriptPayloadRequestJSON | AptosModuleBundlePayloadRequestJSON;
export type AptosSubmitTransactionRequestPayloadInput = AptosEntryFunctionPayloadRequestInput | AptosScriptPayloadRequestInput | AptosModuleBundlePayloadRequestInput;
export type AptosSubmitTransactionRequestPayloadValue = AptosEntryFunctionPayloadRequest | AptosScriptPayloadRequest | AptosModuleBundlePayloadRequest;

export abstract class AptosSubmitTransactionRequestPayload {
  public static create(input: AptosSubmitTransactionRequestPayloadInput): AptosSubmitTransactionRequestPayloadValue {
    if (AptosEntryFunctionPayloadRequest.isInput(input)) {
      return AptosEntryFunctionPayloadRequest.create(input);
    }
    if (AptosScriptPayloadRequest.isInput(input)) {
      return AptosScriptPayloadRequest.create(input);
    }
    if (AptosModuleBundlePayloadRequest.isInput(input)) {
      return AptosModuleBundlePayloadRequest.create(input);
    }
    throw new Error('Cannot resolve union from AptosSubmitTransactionRequestPayloadInput');
  }

  public static fromJSON(json: AptosSubmitTransactionRequestPayloadJSON): AptosSubmitTransactionRequestPayloadValue {
    if (AptosEntryFunctionPayloadRequest.isJSON(json)) {
      return AptosEntryFunctionPayloadRequest.fromJSON(json);
    }
    if (AptosScriptPayloadRequest.isJSON(json)) {
      return AptosScriptPayloadRequest.fromJSON(json);
    }
    if (AptosModuleBundlePayloadRequest.isJSON(json)) {
      return AptosModuleBundlePayloadRequest.fromJSON(json);
    }
    const keys = Object.keys(json).join(', ');
    const type = (json as any).type;
    throw new Error(`Cannot resolve union from AptosSubmitTransactionRequestPayloadJSON (keys: ${keys}, type: ${type})`);
  }

  public static toJSON(value: AptosSubmitTransactionRequestPayloadValue): AptosSubmitTransactionRequestPayloadJSON {
    if (value instanceof AptosEntryFunctionPayloadRequest) {
      return value.toJSON();
    }
    if (value instanceof AptosScriptPayloadRequest) {
      return value.toJSON();
    }
    if (value instanceof AptosModuleBundlePayloadRequest) {
      return value.toJSON();
    }
    throw new Error('Cannot resolve union from AptosSubmitTransactionRequestPayloadValue');
  }
}
