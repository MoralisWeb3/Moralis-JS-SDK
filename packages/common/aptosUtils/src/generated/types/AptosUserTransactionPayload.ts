import { AptosEntryFunctionPayloadRequest, AptosEntryFunctionPayloadRequestJSON, AptosEntryFunctionPayloadRequestInput } from '../types/AptosEntryFunctionPayloadRequest';
import { AptosScriptPayloadRequest, AptosScriptPayloadRequestJSON, AptosScriptPayloadRequestInput } from '../types/AptosScriptPayloadRequest';
import { AptosModuleBundlePayloadRequest, AptosModuleBundlePayloadRequestJSON, AptosModuleBundlePayloadRequestInput } from '../types/AptosModuleBundlePayloadRequest';

// $ref: #/components/schemas/UserTransaction/properties/payload
// typeName: UserTransaction_payload
// unionType: oneOf

export type AptosUserTransactionPayloadJSON = AptosEntryFunctionPayloadRequestJSON | AptosScriptPayloadRequestJSON | AptosModuleBundlePayloadRequestJSON;
export type AptosUserTransactionPayloadInput = AptosEntryFunctionPayloadRequestInput | AptosScriptPayloadRequestInput | AptosModuleBundlePayloadRequestInput;
export type AptosUserTransactionPayloadValue = AptosEntryFunctionPayloadRequest | AptosScriptPayloadRequest | AptosModuleBundlePayloadRequest;

export abstract class AptosUserTransactionPayload {
  public static create(input: AptosUserTransactionPayloadInput): AptosUserTransactionPayloadValue {
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

  public static fromJSON(json: AptosUserTransactionPayloadJSON): AptosUserTransactionPayloadValue {
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
    throw new Error(`Cannot resolve union for AptosUserTransactionPayload (keys: ${keys}, type: ${type})`);
  }
}
