import { AptosTransactionEventGuid, AptosTransactionEventGuidInput, AptosTransactionEventGuidJSON } from '../types/AptosTransactionEventGuid';

// $ref: #/components/schemas/TransactionEvent
// type: TransactionEvent
// properties:
// - guid ($ref: #/components/schemas/TransactionEventGuid)
// - sequence_number ($ref: #/components/schemas/TransactionEvent/properties/sequence_number)
// - type ($ref: #/components/schemas/TransactionEvent/properties/type)
// - data ($ref: #/components/schemas/TransactionEvent/properties/data)

export interface AptosTransactionEventJSON {
  readonly guid: AptosTransactionEventGuidJSON;
  readonly sequence_number: string;
  readonly type: string;
  readonly data: string;
}

export interface AptosTransactionEventInput {
  readonly guid: AptosTransactionEventGuidInput | AptosTransactionEventGuid;
  readonly sequenceNumber: string;
  readonly type: string;
  readonly data: string;
}

export class AptosTransactionEvent {
  public static create(input: AptosTransactionEventInput | AptosTransactionEvent): AptosTransactionEvent {
    if (input instanceof AptosTransactionEvent) {
      return input;
    }
    return new AptosTransactionEvent(input);
  }

  public static fromJSON(json: AptosTransactionEventJSON): AptosTransactionEvent {
    const input: AptosTransactionEventInput = {
      guid: AptosTransactionEventGuid.fromJSON(json.guid),
      sequenceNumber: json.sequence_number,
      type: json.type,
      data: json.data,
    };
    return AptosTransactionEvent.create(input);
  }

  public readonly guid: AptosTransactionEventGuid;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly sequenceNumber: string;
  /**
   * @description String representation of an on-chain Move type tag that is exposed in transaction payload.
   */
  public readonly type: string;
  /**
   * @description The JSON representation of the event
   */
  public readonly data: string;

  private constructor(input: AptosTransactionEventInput) {
    this.guid = AptosTransactionEventGuid.create(input.guid);
    this.sequenceNumber = input.sequenceNumber;
    this.type = input.type;
    this.data = input.data;
  }

  public toJSON(): AptosTransactionEventJSON {
    return {
      guid: this.guid.toJSON(),
      sequence_number: this.sequenceNumber,
      type: this.type,
      data: this.data,
    }
  }
}
