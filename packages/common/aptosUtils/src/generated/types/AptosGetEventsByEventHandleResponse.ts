import { AptosTransactionEventGuid, AptosTransactionEventGuidInput, AptosTransactionEventGuidJSON } from '../types/AptosTransactionEventGuid';
import { AptosGetEventsByEventHandleResponseData, AptosGetEventsByEventHandleResponseDataInput, AptosGetEventsByEventHandleResponseDataJSON } from '../types/AptosGetEventsByEventHandleResponseData';

// $ref: #/components/schemas/GetEventsByEventHandleResponse
// type: GetEventsByEventHandleResponse
// properties:
// - version ($ref: #/components/schemas/GetEventsByEventHandleResponse/properties/version)
// - guid ($ref: #/components/schemas/TransactionEventGuid)
// - sequence_number ($ref: #/components/schemas/GetEventsByEventHandleResponse/properties/sequence_number)
// - type ($ref: #/components/schemas/GetEventsByEventHandleResponse/properties/type)
// - data ($ref: #/components/schemas/GetEventsByEventHandleResponse/properties/data)

export interface AptosGetEventsByEventHandleResponseJSON {
  readonly version: string;
  readonly guid: AptosTransactionEventGuidJSON;
  readonly sequence_number: string;
  readonly type: string;
  readonly data: AptosGetEventsByEventHandleResponseDataJSON;
}

export interface AptosGetEventsByEventHandleResponseInput {
  readonly version: string;
  readonly guid: AptosTransactionEventGuidInput | AptosTransactionEventGuid;
  readonly sequenceNumber: string;
  readonly type: string;
  readonly data: AptosGetEventsByEventHandleResponseDataInput | AptosGetEventsByEventHandleResponseData;
}

export class AptosGetEventsByEventHandleResponse {
  public static create(input: AptosGetEventsByEventHandleResponseInput | AptosGetEventsByEventHandleResponse): AptosGetEventsByEventHandleResponse {
    if (input instanceof AptosGetEventsByEventHandleResponse) {
      return input;
    }
    return new AptosGetEventsByEventHandleResponse(input);
  }

  public static fromJSON(json: AptosGetEventsByEventHandleResponseJSON): AptosGetEventsByEventHandleResponse {
    const input: AptosGetEventsByEventHandleResponseInput = {
      version: json.version,
      guid: AptosTransactionEventGuid.fromJSON(json.guid),
      sequenceNumber: json.sequence_number,
      type: json.type,
      data: AptosGetEventsByEventHandleResponseData.fromJSON(json.data),
    };
    return AptosGetEventsByEventHandleResponse.create(input);
  }

  /**
   * @description A string containing a 64-bit unsigned integer.
   * We represent u64 values as a string to ensure compatibility with languages such as JavaScript that do not parse u64s in JSON natively.
   */
  public readonly version: string;
  public readonly guid: AptosTransactionEventGuid;
  /**
   * @description A string containing a 64-bit unsigned integer.
   * We represent u64 values as a string to ensure compatibility with languages such as JavaScript that do not parse u64s in JSON natively.
   */
  public readonly sequenceNumber: string;
  /**
   * @description String representation of an on-chain Move type tag that is exposed in transaction payload.
   */
  public readonly type: string;
  /**
   * @description The JSON representation of the event
   */
  public readonly data: AptosGetEventsByEventHandleResponseData;

  private constructor(input: AptosGetEventsByEventHandleResponseInput) {
    this.version = input.version;
    this.guid = AptosTransactionEventGuid.create(input.guid);
    this.sequenceNumber = input.sequenceNumber;
    this.type = input.type;
    this.data = AptosGetEventsByEventHandleResponseData.create(input.data);
  }

  public toJSON(): AptosGetEventsByEventHandleResponseJSON {
    return {
      version: this.version,
      guid: this.guid.toJSON(),
      sequence_number: this.sequenceNumber,
      type: this.type,
      data: this.data.toJSON(),
    }
  }
}
