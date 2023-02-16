// $ref: #/components/schemas/ScriptPayloadRequest/properties/code
// typeName: ScriptPayloadRequest_code

export type AptosScriptPayloadRequestCodeJSON = object;
export type AptosScriptPayloadRequestCodeInput = AptosScriptPayloadRequestCodeJSON;

export class AptosScriptPayloadRequestCode {
  public static create(input: AptosScriptPayloadRequestCodeInput | AptosScriptPayloadRequestCode) {
    if (input instanceof AptosScriptPayloadRequestCode) {
      return input;
    }
    return new AptosScriptPayloadRequestCode(input);
  }

  public static fromJSON(json: AptosScriptPayloadRequestCodeJSON) {
    return new AptosScriptPayloadRequestCode(json);
  }

  public constructor(public readonly value: AptosScriptPayloadRequestCodeInput) {}

  public toJSON(): AptosScriptPayloadRequestCodeJSON {
    return this.value;
  }
}
