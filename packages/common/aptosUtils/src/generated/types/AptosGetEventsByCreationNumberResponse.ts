import { AptosTransactionEventGuid, AptosTransactionEventGuidInput, AptosTransactionEventGuidJSON } from '../types/AptosTransactionEventGuid';
import { AptosGetEventsByCreationNumberResponseData, AptosGetEventsByCreationNumberResponseDataInput, AptosGetEventsByCreationNumberResponseDataJSON } from '../types/AptosGetEventsByCreationNumberResponseData';

// $ref: #/components/schemas/GetEventsByCreationNumberResponse
// type: GetEventsByCreationNumberResponse
// properties:
// - version ($ref: #/components/schemas/GetEventsByCreationNumberResponse/properties/version)
// - guid ($ref: #/components/schemas/TransactionEventGuid)
// - sequence_number ($ref: #/components/schemas/GetEventsByCreationNumberResponse/properties/sequence_number)
// - type ($ref: #/components/schemas/GetEventsByCreationNumberResponse/properties/type)
// - data ($ref: #/components/schemas/GetEventsByCreationNumberResponse/properties/data)

export interface AptosGetEventsByCreationNumberResponseJSON {
  readonly version: string;
  readonly guid: AptosTransactionEventGuidJSON;
  readonly sequence_number: string;
  readonly type: string;
  readonly data: AptosGetEventsByCreationNumberResponseDataJSON;
}

export interface AptosGetEventsByCreationNumberResponseInput {
  readonly version: string;
  readonly guid: AptosTransactionEventGuidInput | AptosTransactionEventGuid;
  readonly sequenceNumber: string;
  readonly type: string;
  readonly data: AptosGetEventsByCreationNumberResponseDataInput | AptosGetEventsByCreationNumberResponseData;
}

export class AptosGetEventsByCreationNumberResponse {
  public static create(input: AptosGetEventsByCreationNumberResponseInput | AptosGetEventsByCreationNumberResponse): AptosGetEventsByCreationNumberResponse {
    if (input instanceof AptosGetEventsByCreationNumberResponse) {
      return input;
    }
    return new AptosGetEventsByCreationNumberResponse(input);
  }

  public static fromJSON(json: AptosGetEventsByCreationNumberResponseJSON): AptosGetEventsByCreationNumberResponse {
    const input: AptosGetEventsByCreationNumberResponseInput = {
      version: json.version,
      guid: AptosTransactionEventGuid.fromJSON(json.guid),
      sequenceNumber: json.sequence_number,
      type: json.type,
      data: AptosGetEventsByCreationNumberResponseData.fromJSON(json.data),
    };
    return AptosGetEventsByCreationNumberResponse.create(input);
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
  public readonly data: AptosGetEventsByCreationNumberResponseData;

  private constructor(input: AptosGetEventsByCreationNumberResponseInput) {
    this.version = input.version;
    this.guid = AptosTransactionEventGuid.create(input.guid);
    this.sequenceNumber = input.sequenceNumber;
    this.type = input.type;
    this.data = AptosGetEventsByCreationNumberResponseData.create(input.data);
  }

  public toJSON(): AptosGetEventsByCreationNumberResponseJSON {
    return {
      version: this.version,
      guid: this.guid.toJSON(),
      sequence_number: this.sequenceNumber,
      type: this.type,
      data: this.data.toJSON(),
    }
  }
}
