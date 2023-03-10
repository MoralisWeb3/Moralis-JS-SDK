import { AptosEntryFunctionPayloadRequest, AptosEntryFunctionPayloadRequestJSON, AptosEntryFunctionPayloadRequestInput } from '../types/AptosEntryFunctionPayloadRequest';
import { AptosScriptPayloadRequest, AptosScriptPayloadRequestJSON, AptosScriptPayloadRequestInput } from '../types/AptosScriptPayloadRequest';
import { AptosModuleBundlePayloadRequest, AptosModuleBundlePayloadRequestJSON, AptosModuleBundlePayloadRequestInput } from '../types/AptosModuleBundlePayloadRequest';

// $ref: #/components/schemas/PendingTransaction/properties/payload
// typeName: PendingTransaction_payload
// unionType: oneOf

export type AptosPendingTransactionPayloadJSON = AptosEntryFunctionPayloadRequestJSON | AptosScriptPayloadRequestJSON | AptosModuleBundlePayloadRequestJSON;
export type AptosPendingTransactionPayloadInput = AptosEntryFunctionPayloadRequestInput | AptosScriptPayloadRequestInput | AptosModuleBundlePayloadRequestInput;
export type AptosPendingTransactionPayloadValue = AptosEntryFunctionPayloadRequest | AptosScriptPayloadRequest | AptosModuleBundlePayloadRequest;

export abstract class AptosPendingTransactionPayload {
  public static create(input: AptosPendingTransactionPayloadInput): AptosPendingTransactionPayloadValue {
    if (AptosEntryFunctionPayloadRequest.isInput(input)) {
      return AptosEntryFunctionPayloadRequest.create(input);
    }
    if (AptosScriptPayloadRequest.isInput(input)) {
      return AptosScriptPayloadRequest.create(input);
    }
    if (AptosModuleBundlePayloadRequest.isInput(input)) {
      return AptosModuleBundlePayloadRequest.create(input);
    }
    throw new Error('Cannot resolve union for input');
  }

  public static fromJSON(json: AptosPendingTransactionPayloadJSON): AptosPendingTransactionPayloadValue {
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
    throw new Error(`Cannot resolve union for AptosPendingTransactionPayload (keys: ${keys}, type: ${type})`);
  }
}
