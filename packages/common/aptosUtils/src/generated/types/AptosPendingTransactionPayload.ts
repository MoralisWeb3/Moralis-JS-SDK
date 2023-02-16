import { AptosEntryFunctionPayloadRequest, AptosEntryFunctionPayloadRequestJSON, AptosEntryFunctionPayloadRequestInput } from '../types/AptosEntryFunctionPayloadRequest';
import { AptosScriptPayloadRequest, AptosScriptPayloadRequestJSON, AptosScriptPayloadRequestInput } from '../types/AptosScriptPayloadRequest';
import { AptosModuleBundlePayloadRequest, AptosModuleBundlePayloadRequestJSON, AptosModuleBundlePayloadRequestInput } from '../types/AptosModuleBundlePayloadRequest';

// $ref: #/components/schemas/PendingTransaction/properties/payload
// typeName: PendingTransaction_payload
// unionType: oneOf

export type AptosPendingTransactionPayloadJSON = AptosEntryFunctionPayloadRequestJSON | AptosScriptPayloadRequestJSON | AptosModuleBundlePayloadRequestJSON;
export type AptosPendingTransactionPayloadInput = AptosEntryFunctionPayloadRequestInput | AptosScriptPayloadRequestInput | AptosModuleBundlePayloadRequestInput;

export class AptosPendingTransactionPayload {
  public static create(input: AptosPendingTransactionPayloadInput | AptosPendingTransactionPayload): AptosPendingTransactionPayload {
    if (input instanceof AptosPendingTransactionPayload) {
      return input;
    }
    if (AptosEntryFunctionPayloadRequest.isInput(input)) {
      return new AptosPendingTransactionPayload(AptosEntryFunctionPayloadRequest.create(input));
    }
    if (AptosScriptPayloadRequest.isInput(input)) {
      return new AptosPendingTransactionPayload(AptosScriptPayloadRequest.create(input));
    }
    if (AptosModuleBundlePayloadRequest.isInput(input)) {
      return new AptosPendingTransactionPayload(AptosModuleBundlePayloadRequest.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosPendingTransactionPayloadJSON): AptosPendingTransactionPayload {
    if (AptosEntryFunctionPayloadRequest.isJSON(json)) {
      return new AptosPendingTransactionPayload(AptosEntryFunctionPayloadRequest.fromJSON(json));
    }
    if (AptosScriptPayloadRequest.isJSON(json)) {
      return new AptosPendingTransactionPayload(AptosScriptPayloadRequest.fromJSON(json));
    }
    if (AptosModuleBundlePayloadRequest.isJSON(json)) {
      return new AptosPendingTransactionPayload(AptosModuleBundlePayloadRequest.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosPendingTransactionPayload (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosEntryFunctionPayloadRequest | AptosScriptPayloadRequest | AptosModuleBundlePayloadRequest) {}

  public toJSON(): AptosPendingTransactionPayloadJSON {
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
