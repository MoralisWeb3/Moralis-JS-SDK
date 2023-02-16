import { AptosScriptWriteSet, AptosScriptWriteSetJSON, AptosScriptWriteSetInput } from '../types/AptosScriptWriteSet';
import { AptosDirectWriteSet, AptosDirectWriteSetJSON, AptosDirectWriteSetInput } from '../types/AptosDirectWriteSet';

// $ref: #/components/schemas/WriteSetPayload/properties/write_set
// typeName: WriteSetPayload_write_set
// unionType: oneOf

export type AptosWriteSetPayloadWriteSetJSON = AptosScriptWriteSetJSON | AptosDirectWriteSetJSON;
export type AptosWriteSetPayloadWriteSetInput = AptosScriptWriteSetInput | AptosDirectWriteSetInput;

export class AptosWriteSetPayloadWriteSet {
  public static create(input: AptosWriteSetPayloadWriteSetInput | AptosWriteSetPayloadWriteSet): AptosWriteSetPayloadWriteSet {
    if (input instanceof AptosWriteSetPayloadWriteSet) {
      return input;
    }
    if (AptosScriptWriteSet.isInput(input)) {
      return new AptosWriteSetPayloadWriteSet(AptosScriptWriteSet.create(input));
    }
    if (AptosDirectWriteSet.isInput(input)) {
      return new AptosWriteSetPayloadWriteSet(AptosDirectWriteSet.create(input));
    }
    throw new Error('Invalid input');
  }

  public static fromJSON(json: AptosWriteSetPayloadWriteSetJSON): AptosWriteSetPayloadWriteSet {
    if (AptosScriptWriteSet.isJSON(json)) {
      return new AptosWriteSetPayloadWriteSet(AptosScriptWriteSet.fromJSON(json));
    }
    if (AptosDirectWriteSet.isJSON(json)) {
      return new AptosWriteSetPayloadWriteSet(AptosDirectWriteSet.fromJSON(json));
    }
    throw new Error(`Cannot resolve union for AptosWriteSetPayloadWriteSet (keys: ${Object.keys(json).join(',') })`);
  }

  public constructor(public readonly value: AptosScriptWriteSet | AptosDirectWriteSet) {}

  public toJSON(): AptosWriteSetPayloadWriteSetJSON {
    if (this.value instanceof AptosScriptWriteSet) {
      return this.value.toJSON();
    }
    if (this.value instanceof AptosDirectWriteSet) {
      return this.value.toJSON();
    }
    throw new Error('Invalid value');
  }
}
