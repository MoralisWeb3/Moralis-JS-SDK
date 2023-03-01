import { AptosDirectWriteSetChanges, AptosDirectWriteSetChangesValue, AptosDirectWriteSetChangesInput, AptosDirectWriteSetChangesJSON } from '../types/AptosDirectWriteSetChanges';
import { AptosTransactionEvent, AptosTransactionEventInput, AptosTransactionEventJSON } from '../types/AptosTransactionEvent';

// $ref: #/components/schemas/DirectWriteSet
// type: DirectWriteSet
// properties:
// - type ($ref: #/components/schemas/DirectWriteSet/properties/type)
// - changes ($ref: #/components/schemas/DirectWriteSet/properties/changes)
// - events ($ref: #/components/schemas/TransactionEvent)

export interface AptosDirectWriteSetJSON {
  readonly type: string;
  readonly changes: AptosDirectWriteSetChangesJSON;
  readonly events: AptosTransactionEventJSON[];
}

export interface AptosDirectWriteSetInput {
  readonly type: string;
  readonly changes: AptosDirectWriteSetChangesInput | AptosDirectWriteSetChangesValue;
  readonly events: AptosTransactionEventInput[] | AptosTransactionEvent[];
}

export class AptosDirectWriteSet {
  public static create(input: AptosDirectWriteSetInput | AptosDirectWriteSet): AptosDirectWriteSet {
    if (input instanceof AptosDirectWriteSet) {
      return input;
    }
    return new AptosDirectWriteSet(input);
  }

  public static fromJSON(json: AptosDirectWriteSetJSON): AptosDirectWriteSet {
    const input: AptosDirectWriteSetInput = {
      type: json.type,
      changes: AptosDirectWriteSetChanges.fromJSON(json.changes),
      events: json.events.map((item) => AptosTransactionEvent.fromJSON(item)),
    };
    return AptosDirectWriteSet.create(input);
  }

  public static isInput(input: any): input is AptosDirectWriteSetInput {
    return ["type","changes","events"].every((name) => input[name] !== undefined);
  }

  public static isJSON(json: any): json is AptosDirectWriteSetJSON {
    return ["type","changes","events"].every((name) => json[name] !== undefined);
  }

  public readonly type: string;
  public readonly changes: AptosDirectWriteSetChangesValue;
  /**
   * @description Events emitted during genesis
   */
  public readonly events: AptosTransactionEvent[];

  private constructor(input: AptosDirectWriteSetInput) {
    this.type = input.type;
    this.changes = AptosDirectWriteSetChanges.create(input.changes);
    this.events = input.events.map((item) => AptosTransactionEvent.create(item));
  }

  public toJSON(): AptosDirectWriteSetJSON {
    return {
      type: this.type,
      changes: this.changes.toJSON(),
      events: this.events.map((item) => item.toJSON()),
    }
  }
}
