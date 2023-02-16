import { AptosEntryFunctionPayloadRequest, AptosEntryFunctionPayloadRequestJSON, AptosEntryFunctionPayloadRequestInput } from '../types/AptosEntryFunctionPayloadRequest';
import { AptosScriptPayloadRequest, AptosScriptPayloadRequestJSON, AptosScriptPayloadRequestInput } from '../types/AptosScriptPayloadRequest';
import { AptosModuleBundlePayloadRequest, AptosModuleBundlePayloadRequestJSON, AptosModuleBundlePayloadRequestInput } from '../types/AptosModuleBundlePayloadRequest';

// $ref: #/components/schemas/EncodeSubmissionRequest/properties/payload
// typeName: EncodeSubmissionRequest_payload
// unionType: oneOf

export type AptosEncodeSubmissionRequestPayloadJSON = AptosEntryFunctionPayloadRequestJSON | AptosScriptPayloadRequestJSON | AptosModuleBundlePayloadRequestJSON;
export type AptosEncodeSubmissionRequestPayloadInput = AptosEntryFunctionPayloadRequestInput | AptosScriptPayloadRequestInput | AptosModuleBundlePayloadRequestInput;

export class AptosEncodeSubmissionRequestPayload {
  public static create(input: AptosEncodeSubmissionRequestPayloadInput | AptosEncodeSubmissionRequestPayload): AptosEncodeSubmissionRequestPayload {
    if (input instanceof AptosEncodeSubmissionRequestPayload) {
      return input;
    }
    if (AptosEntryFunctionPayloadRequest.isInput(input)) {
      return new AptosEncodeSubmissionRequestPayload(AptosEntryFunctionPayloadRequest.create(input));
    }
    if (AptosScriptPayloadRequest.isInput(input)) {
      return new AptosEncodeSubmissionRequestPayload(AptosScriptPayloadRequest.create(input));
    }
    if (AptosModuleBundlePayloadRequest.isInput(input)) {
      return new AptosEncodeSubmissionRequestPayload(AptosModuleBundlePayloadRequest.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosEncodeSubmissionRequestPayloadJSON): AptosEncodeSubmissionRequestPayload {
    if (AptosEntryFunctionPayloadRequest.isJSON(json)) {
      return new AptosEncodeSubmissionRequestPayload(AptosEntryFunctionPayloadRequest.fromJSON(json));
    }
    if (AptosScriptPayloadRequest.isJSON(json)) {
      return new AptosEncodeSubmissionRequestPayload(AptosScriptPayloadRequest.fromJSON(json));
    }
    if (AptosModuleBundlePayloadRequest.isJSON(json)) {
      return new AptosEncodeSubmissionRequestPayload(AptosModuleBundlePayloadRequest.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosEncodeSubmissionRequestPayload (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosEntryFunctionPayloadRequest | AptosScriptPayloadRequest | AptosModuleBundlePayloadRequest) {}

  public toJSON(): AptosEncodeSubmissionRequestPayloadJSON {
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
