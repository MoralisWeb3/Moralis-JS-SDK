import { AptosScriptPayloadRequest, AptosScriptPayloadRequestInput, AptosScriptPayloadRequestJSON } from '../types/AptosScriptPayloadRequest';

// $ref: #/components/schemas/ScriptWriteSet
// type: ScriptWriteSet
// properties:
// - type ($ref: #/components/schemas/ScriptWriteSet/properties/type)
// - execute_as ($ref: #/components/schemas/ScriptWriteSet/properties/execute_as)
// - script ($ref: #/components/schemas/ScriptPayloadRequest)

export interface AptosScriptWriteSetJSON {
  readonly type: string;
  readonly execute_as: string;
  readonly script: AptosScriptPayloadRequestJSON;
}

export interface AptosScriptWriteSetInput {
  readonly type: string;
  readonly executeAs: string;
  readonly script: AptosScriptPayloadRequestInput | AptosScriptPayloadRequest;
}

export class AptosScriptWriteSet {
  public static create(input: AptosScriptWriteSetInput | AptosScriptWriteSet): AptosScriptWriteSet {
    if (input instanceof AptosScriptWriteSet) {
      return input;
    }
    return new AptosScriptWriteSet(input);
  }

  public static fromJSON(json: AptosScriptWriteSetJSON): AptosScriptWriteSet {
    const input: AptosScriptWriteSetInput = {
      type: json.type,
      executeAs: json.execute_as,
      script: AptosScriptPayloadRequest.fromJSON(json.script),
    };
    return AptosScriptWriteSet.create(input);
  }

  public static isInput(input: any): input is AptosScriptWriteSetInput {
    return ["type","executeAs","script"].every((name) => input[name] !== undefined);
  }

  public static isJSON(json: any): json is AptosScriptWriteSetJSON {
    return ["type","execute_as","script"].every((name) => json[name] !== undefined);
  }

  public readonly type: string;
  /**
   * @description A hex encoded 32 byte Aptos account address.
   */
  public readonly executeAs: string;
  /**
   * @description Payload which runs a script that can run multiple functions
   */
  public readonly script: AptosScriptPayloadRequest;

  private constructor(input: AptosScriptWriteSetInput) {
    this.type = input.type;
    this.executeAs = input.executeAs;
    this.script = AptosScriptPayloadRequest.create(input.script);
  }

  public toJSON(): AptosScriptWriteSetJSON {
    return {
      type: this.type,
      execute_as: this.executeAs,
      script: this.script.toJSON(),
    }
  }
}
