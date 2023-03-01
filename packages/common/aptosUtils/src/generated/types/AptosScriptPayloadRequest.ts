import { AptosScriptPayloadRequestCode, AptosScriptPayloadRequestCodeValue, AptosScriptPayloadRequestCodeInput, AptosScriptPayloadRequestCodeJSON } from '../types/AptosScriptPayloadRequestCode';

// $ref: #/components/schemas/ScriptPayloadRequest
// type: ScriptPayloadRequest
// properties:
// - type ($ref: #/components/schemas/ScriptPayloadRequest/properties/type)
// - code ($ref: #/components/schemas/ScriptPayloadRequest/properties/code)
// - type_arguments ($ref: #/components/schemas/ScriptPayloadRequest/properties/type_arguments)
// - arguments ($ref: #/components/schemas/ScriptPayloadRequest/properties/arguments)

export interface AptosScriptPayloadRequestJSON {
  readonly type: string;
  readonly code: AptosScriptPayloadRequestCodeJSON;
  readonly type_arguments: string[];
  readonly arguments: string[];
}

export interface AptosScriptPayloadRequestInput {
  readonly type: string;
  readonly code: AptosScriptPayloadRequestCodeInput | AptosScriptPayloadRequestCodeValue;
  readonly typeArguments: string[];
  readonly arguments: string[];
}

export class AptosScriptPayloadRequest {
  public static create(input: AptosScriptPayloadRequestInput | AptosScriptPayloadRequest): AptosScriptPayloadRequest {
    if (input instanceof AptosScriptPayloadRequest) {
      return input;
    }
    return new AptosScriptPayloadRequest(input);
  }

  public static fromJSON(json: AptosScriptPayloadRequestJSON): AptosScriptPayloadRequest {
    const input: AptosScriptPayloadRequestInput = {
      type: json.type,
      code: AptosScriptPayloadRequestCode.fromJSON(json.code),
      typeArguments: json.type_arguments,
      arguments: json.arguments,
    };
    return AptosScriptPayloadRequest.create(input);
  }

  public static isInput(input: any): input is AptosScriptPayloadRequestInput {
    return ["type","code","typeArguments","arguments"].every((name) => input[name] !== undefined);
  }

  public static isJSON(json: any): json is AptosScriptPayloadRequestJSON {
    return ["type","code","type_arguments","arguments"].every((name) => json[name] !== undefined);
  }

  /**
   * @description Type of payload
   */
  public readonly type: string;
  /**
   * @description Move script bytecode
   */
  public readonly code: AptosScriptPayloadRequestCodeValue;
  /**
   * @description Type arguments of the function
   */
  public readonly typeArguments: string[];
  /**
   * @description Arguments of the function
   */
  public readonly arguments: string[];

  private constructor(input: AptosScriptPayloadRequestInput) {
    this.type = input.type;
    this.code = AptosScriptPayloadRequestCode.create(input.code);
    this.typeArguments = input.typeArguments;
    this.arguments = input.arguments;
  }

  public toJSON(): AptosScriptPayloadRequestJSON {
    return {
      type: this.type,
      code: this.code,
      type_arguments: this.typeArguments,
      arguments: this.arguments,
    }
  }
}
