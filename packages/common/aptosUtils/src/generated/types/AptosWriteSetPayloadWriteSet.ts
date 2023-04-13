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
    throw new Error('Cannot resolve union from AptosWriteSetPayloadWriteSetInput');
  }

  public static fromJSON(json: AptosWriteSetPayloadWriteSetJSON): AptosWriteSetPayloadWriteSetValue {
    if (AptosScriptWriteSet.isJSON(json)) {
      return AptosScriptWriteSet.fromJSON(json);
    }
    if (AptosDirectWriteSet.isJSON(json)) {
      return AptosDirectWriteSet.fromJSON(json);
    }
    const keys = Object.keys(json).join(', ');
    const type = (json as any).type;
    throw new Error(`Cannot resolve union from AptosWriteSetPayloadWriteSetJSON (keys: ${keys}, type: ${type})`);
  }

  public static toJSON(value: AptosWriteSetPayloadWriteSetValue): AptosWriteSetPayloadWriteSetJSON {
    if (value instanceof AptosScriptWriteSet) {
      return value.toJSON();
    }
    if (value instanceof AptosDirectWriteSet) {
      return value.toJSON();
    }
    throw new Error('Cannot resolve union from AptosWriteSetPayloadWriteSetValue');
  }
}
