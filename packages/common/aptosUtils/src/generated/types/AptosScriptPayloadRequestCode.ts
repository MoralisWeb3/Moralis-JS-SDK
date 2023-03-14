// $ref: #/components/schemas/ScriptPayloadRequest/properties/code
// typeName: ScriptPayloadRequest_code

export type AptosScriptPayloadRequestCodeJSON = object;
export type AptosScriptPayloadRequestCodeInput = object;
export type AptosScriptPayloadRequestCodeValue = object;

export abstract class AptosScriptPayloadRequestCode {
  public static create(input: AptosScriptPayloadRequestCodeInput | AptosScriptPayloadRequestCodeValue): AptosScriptPayloadRequestCodeValue {
    return input;
  }

  public static fromJSON(json: AptosScriptPayloadRequestCodeJSON): AptosScriptPayloadRequestCodeValue {
    return json;
  }
}
