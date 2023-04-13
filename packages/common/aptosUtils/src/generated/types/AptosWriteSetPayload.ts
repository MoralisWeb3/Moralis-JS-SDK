import { AptosWriteSetPayloadWriteSet, AptosWriteSetPayloadWriteSetValue, AptosWriteSetPayloadWriteSetInput, AptosWriteSetPayloadWriteSetJSON } from '../types/AptosWriteSetPayloadWriteSet';

// $ref: #/components/schemas/WriteSetPayload
// type: WriteSetPayload
// properties:
// - type ($ref: #/components/schemas/WriteSetPayload/properties/type)
// - write_set ($ref: #/components/schemas/WriteSetPayload/properties/write_set)

export interface AptosWriteSetPayloadJSON {
  readonly type: string;
  readonly write_set: AptosWriteSetPayloadWriteSetJSON;
}

export interface AptosWriteSetPayloadInput {
  readonly type: string;
  readonly writeSet: AptosWriteSetPayloadWriteSetInput | AptosWriteSetPayloadWriteSetValue;
}

export class AptosWriteSetPayload {
  public static create(input: AptosWriteSetPayloadInput | AptosWriteSetPayload): AptosWriteSetPayload {
    if (input instanceof AptosWriteSetPayload) {
      return input;
    }
    return new AptosWriteSetPayload(input);
  }

  public static fromJSON(json: AptosWriteSetPayloadJSON): AptosWriteSetPayload {
    const input: AptosWriteSetPayloadInput = {
      type: json.type,
      writeSet: AptosWriteSetPayloadWriteSet.fromJSON(json.write_set),
    };
    return AptosWriteSetPayload.create(input);
  }

  public readonly type: string;
  /**
   * @description The associated writeset with a payload
   */
  public readonly writeSet: AptosWriteSetPayloadWriteSetValue;

  private constructor(input: AptosWriteSetPayloadInput) {
    this.type = input.type;
    this.writeSet = AptosWriteSetPayloadWriteSet.create(input.writeSet);
  }

  public toJSON(): AptosWriteSetPayloadJSON {
    return {
      type: this.type,
      write_set: AptosWriteSetPayloadWriteSet.toJSON(this.writeSet),
    }
  }
}
