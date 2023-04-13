import { AptosEntryFunctionPayloadRequest, AptosEntryFunctionPayloadRequestJSON, AptosEntryFunctionPayloadRequestInput } from '../types/AptosEntryFunctionPayloadRequest';
import { AptosScriptPayloadRequest, AptosScriptPayloadRequestJSON, AptosScriptPayloadRequestInput } from '../types/AptosScriptPayloadRequest';
import { AptosModuleBundlePayloadRequest, AptosModuleBundlePayloadRequestJSON, AptosModuleBundlePayloadRequestInput } from '../types/AptosModuleBundlePayloadRequest';

// $ref: #/components/schemas/EncodeSubmissionRequest/properties/payload
// typeName: EncodeSubmissionRequest_payload
// unionType: oneOf

export type AptosEncodeSubmissionRequestPayloadJSON = AptosEntryFunctionPayloadRequestJSON | AptosScriptPayloadRequestJSON | AptosModuleBundlePayloadRequestJSON;
export type AptosEncodeSubmissionRequestPayloadInput = AptosEntryFunctionPayloadRequestInput | AptosScriptPayloadRequestInput | AptosModuleBundlePayloadRequestInput;
export type AptosEncodeSubmissionRequestPayloadValue = AptosEntryFunctionPayloadRequest | AptosScriptPayloadRequest | AptosModuleBundlePayloadRequest;

export abstract class AptosEncodeSubmissionRequestPayload {
  public static create(input: AptosEncodeSubmissionRequestPayloadInput): AptosEncodeSubmissionRequestPayloadValue {
    if (AptosEntryFunctionPayloadRequest.isInput(input)) {
      return AptosEntryFunctionPayloadRequest.create(input);
    }
    if (AptosScriptPayloadRequest.isInput(input)) {
      return AptosScriptPayloadRequest.create(input);
    }
    if (AptosModuleBundlePayloadRequest.isInput(input)) {
      return AptosModuleBundlePayloadRequest.create(input);
    }
    throw new Error('Cannot resolve union from AptosEncodeSubmissionRequestPayloadInput');
  }

  public static fromJSON(json: AptosEncodeSubmissionRequestPayloadJSON): AptosEncodeSubmissionRequestPayloadValue {
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
    throw new Error(`Cannot resolve union from AptosEncodeSubmissionRequestPayloadJSON (keys: ${keys}, type: ${type})`);
  }

  public static toJSON(value: AptosEncodeSubmissionRequestPayloadValue): AptosEncodeSubmissionRequestPayloadJSON {
    if (value instanceof AptosEntryFunctionPayloadRequest) {
      return value.toJSON();
    }
    if (value instanceof AptosScriptPayloadRequest) {
      return value.toJSON();
    }
    if (value instanceof AptosModuleBundlePayloadRequest) {
      return value.toJSON();
    }
    throw new Error('Cannot resolve union from AptosEncodeSubmissionRequestPayloadValue');
  }
}
