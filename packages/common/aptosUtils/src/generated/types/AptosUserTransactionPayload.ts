import { AptosEntryFunctionPayloadRequest, AptosEntryFunctionPayloadRequestJSON, AptosEntryFunctionPayloadRequestInput } from '../types/AptosEntryFunctionPayloadRequest';
import { AptosScriptPayloadRequest, AptosScriptPayloadRequestJSON, AptosScriptPayloadRequestInput } from '../types/AptosScriptPayloadRequest';
import { AptosModuleBundlePayloadRequest, AptosModuleBundlePayloadRequestJSON, AptosModuleBundlePayloadRequestInput } from '../types/AptosModuleBundlePayloadRequest';

// $ref: #/components/schemas/UserTransaction/properties/payload
// typeName: UserTransaction_payload
// unionType: oneOf

export type AptosUserTransactionPayloadJSON = AptosEntryFunctionPayloadRequestJSON | AptosScriptPayloadRequestJSON | AptosModuleBundlePayloadRequestJSON;
export type AptosUserTransactionPayloadInput = AptosEntryFunctionPayloadRequestInput | AptosScriptPayloadRequestInput | AptosModuleBundlePayloadRequestInput;

export class AptosUserTransactionPayload {
  public static create(input: AptosUserTransactionPayloadInput | AptosUserTransactionPayload): AptosUserTransactionPayload {
    if (input instanceof AptosUserTransactionPayload) {
      return input;
    }
    if (AptosEntryFunctionPayloadRequest.isInput(input)) {
      return new AptosUserTransactionPayload(AptosEntryFunctionPayloadRequest.create(input));
    }
    if (AptosScriptPayloadRequest.isInput(input)) {
      return new AptosUserTransactionPayload(AptosScriptPayloadRequest.create(input));
    }
    if (AptosModuleBundlePayloadRequest.isInput(input)) {
      return new AptosUserTransactionPayload(AptosModuleBundlePayloadRequest.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosUserTransactionPayloadJSON): AptosUserTransactionPayload {
    if (AptosEntryFunctionPayloadRequest.isJSON(json)) {
      return new AptosUserTransactionPayload(AptosEntryFunctionPayloadRequest.fromJSON(json));
    }
    if (AptosScriptPayloadRequest.isJSON(json)) {
      return new AptosUserTransactionPayload(AptosScriptPayloadRequest.fromJSON(json));
    }
    if (AptosModuleBundlePayloadRequest.isJSON(json)) {
      return new AptosUserTransactionPayload(AptosModuleBundlePayloadRequest.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosUserTransactionPayload (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosEntryFunctionPayloadRequest | AptosScriptPayloadRequest | AptosModuleBundlePayloadRequest) {}

  public toJSON(): AptosUserTransactionPayloadJSON {
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
