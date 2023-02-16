import { AptosEntryFunctionPayloadRequest, AptosEntryFunctionPayloadRequestJSON, AptosEntryFunctionPayloadRequestInput } from '../types/AptosEntryFunctionPayloadRequest';
import { AptosScriptPayloadRequest, AptosScriptPayloadRequestJSON, AptosScriptPayloadRequestInput } from '../types/AptosScriptPayloadRequest';
import { AptosModuleBundlePayloadRequest, AptosModuleBundlePayloadRequestJSON, AptosModuleBundlePayloadRequestInput } from '../types/AptosModuleBundlePayloadRequest';

// $ref: #/components/schemas/SubmitTransactionRequest/properties/payload
// typeName: SubmitTransactionRequest_payload
// unionType: oneOf

export type AptosSubmitTransactionRequestPayloadJSON = AptosEntryFunctionPayloadRequestJSON | AptosScriptPayloadRequestJSON | AptosModuleBundlePayloadRequestJSON;
export type AptosSubmitTransactionRequestPayloadInput = AptosEntryFunctionPayloadRequestInput | AptosScriptPayloadRequestInput | AptosModuleBundlePayloadRequestInput;

export class AptosSubmitTransactionRequestPayload {
  public static create(input: AptosSubmitTransactionRequestPayloadInput | AptosSubmitTransactionRequestPayload): AptosSubmitTransactionRequestPayload {
    if (input instanceof AptosSubmitTransactionRequestPayload) {
      return input;
    }
    if (AptosEntryFunctionPayloadRequest.isInput(input)) {
      return new AptosSubmitTransactionRequestPayload(AptosEntryFunctionPayloadRequest.create(input));
    }
    if (AptosScriptPayloadRequest.isInput(input)) {
      return new AptosSubmitTransactionRequestPayload(AptosScriptPayloadRequest.create(input));
    }
    if (AptosModuleBundlePayloadRequest.isInput(input)) {
      return new AptosSubmitTransactionRequestPayload(AptosModuleBundlePayloadRequest.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosSubmitTransactionRequestPayloadJSON): AptosSubmitTransactionRequestPayload {
    if (AptosEntryFunctionPayloadRequest.isJSON(json)) {
      return new AptosSubmitTransactionRequestPayload(AptosEntryFunctionPayloadRequest.fromJSON(json));
    }
    if (AptosScriptPayloadRequest.isJSON(json)) {
      return new AptosSubmitTransactionRequestPayload(AptosScriptPayloadRequest.fromJSON(json));
    }
    if (AptosModuleBundlePayloadRequest.isJSON(json)) {
      return new AptosSubmitTransactionRequestPayload(AptosModuleBundlePayloadRequest.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosSubmitTransactionRequestPayload (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosEntryFunctionPayloadRequest | AptosScriptPayloadRequest | AptosModuleBundlePayloadRequest) {}

  public toJSON(): AptosSubmitTransactionRequestPayloadJSON {
    if (this.value instanceof AptosEntryFunctionPayloadRequest) {
      return this.value.toJSON();
    }
    if (this.value instanceof AptosScriptPayloadRequest) {
      return this.value.toJSON();
    }
    if (this.value instanceof AptosModuleBundlePayloadRequest) {
      return this.value.toJSON();
    }
    throw new Error('Invalid value');
  }
}
