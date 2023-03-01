import { AptosScriptWriteSet, AptosScriptWriteSetJSON, AptosScriptWriteSetInput } from '../types/AptosScriptWriteSet';
import { AptosDirectWriteSet, AptosDirectWriteSetJSON, AptosDirectWriteSetInput } from '../types/AptosDirectWriteSet';

// $ref: #/components/schemas/WriteSetPayload/properties/write_set
// typeName: WriteSetPayload_write_set
// unionType: oneOf

export type AptosWriteSetPayloadWriteSetJSON = AptosScriptWriteSetJSON | AptosDirectWriteSetJSON;
export type AptosWriteSetPayloadWriteSetInput = AptosScriptWriteSetInput | AptosDirectWriteSetInput;
export type AptosWriteSetPayloadWriteSetValue = AptosScriptWriteSet | AptosDirectWriteSet;

export abstract class AptosWriteSetPayloadWriteSet {
  public static create(input: AptosWriteSetPayloadWriteSetInput): AptosWriteSetPayloadWriteSetValue {
    if (AptosScriptWriteSet.isInput(input)) {
      return AptosScriptWriteSet.create(input);
    }
    if (AptosDirectWriteSet.isInput(input)) {
      return AptosDirectWriteSet.create(input);
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosWriteSetPayloadWriteSetJSON): AptosWriteSetPayloadWriteSetValue {
    if (AptosScriptWriteSet.isJSON(json)) {
      return AptosScriptWriteSet.fromJSON(json);
    }
    if (AptosDirectWriteSet.isJSON(json)) {
      return AptosDirectWriteSet.fromJSON(json);
    }
    throw new Error(`Cannot resolve union for AptosWriteSetPayloadWriteSet (keys: ${Object.keys(json).join(',') })`);
  }
}
