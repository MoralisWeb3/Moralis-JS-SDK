import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosEncodeSubmissionRequestPayload, AptosEncodeSubmissionRequestPayloadValue, AptosEncodeSubmissionRequestPayloadInput, AptosEncodeSubmissionRequestPayloadJSON } from '../types/AptosEncodeSubmissionRequestPayload';

// $ref: #/components/schemas/EncodeSubmissionRequest
// type: EncodeSubmissionRequest
// properties:
// - sender ($ref: #/components/schemas/EncodeSubmissionRequest/properties/sender)
// - sequence_number ($ref: #/components/schemas/EncodeSubmissionRequest/properties/sequence_number)
// - max_gas_amount ($ref: #/components/schemas/EncodeSubmissionRequest/properties/max_gas_amount)
// - gas_unit_price ($ref: #/components/schemas/EncodeSubmissionRequest/properties/gas_unit_price)
// - expiration_timestamp_secs ($ref: #/components/schemas/EncodeSubmissionRequest/properties/expiration_timestamp_secs)
// - payload ($ref: #/components/schemas/EncodeSubmissionRequest/properties/payload)
// - secondary_signers ($ref: #/components/schemas/EncodeSubmissionRequest/properties/secondary_signers)

export interface AptosEncodeSubmissionRequestJSON {
  readonly sender: AptosAddressJSON;
  readonly sequence_number: string;
  readonly max_gas_amount: string;
  readonly gas_unit_price: string;
  readonly expiration_timestamp_secs: string;
  readonly payload: AptosEncodeSubmissionRequestPayloadJSON;
  readonly secondary_signers: string[];
}

export interface AptosEncodeSubmissionRequestInput {
  readonly sender: AptosAddressInput | AptosAddress;
  readonly sequenceNumber: string;
  readonly maxGasAmount: string;
  readonly gasUnitPrice: string;
  readonly expirationTimestampSecs: string;
  readonly payload: AptosEncodeSubmissionRequestPayloadInput | AptosEncodeSubmissionRequestPayloadValue;
  readonly secondarySigners: string[];
}

export class AptosEncodeSubmissionRequest {
  public static create(input: AptosEncodeSubmissionRequestInput | AptosEncodeSubmissionRequest): AptosEncodeSubmissionRequest {
    if (input instanceof AptosEncodeSubmissionRequest) {
      return input;
    }
    return new AptosEncodeSubmissionRequest(input);
  }

  public static fromJSON(json: AptosEncodeSubmissionRequestJSON): AptosEncodeSubmissionRequest {
    const input: AptosEncodeSubmissionRequestInput = {
      sender: AptosAddress.fromJSON(json.sender),
      sequenceNumber: json.sequence_number,
      maxGasAmount: json.max_gas_amount,
      gasUnitPrice: json.gas_unit_price,
      expirationTimestampSecs: json.expiration_timestamp_secs,
      payload: AptosEncodeSubmissionRequestPayload.fromJSON(json.payload),
      secondarySigners: json.secondary_signers,
    };
    return AptosEncodeSubmissionRequest.create(input);
  }

  /**
   * @description A hex encoded 32 byte Aptos account address.
   */
  public readonly sender: AptosAddress;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly sequenceNumber: string;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly maxGasAmount: string;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly gasUnitPrice: string;
  /**
   * @description A string containing a 64-bit unsigned integer.
   */
  public readonly expirationTimestampSecs: string;
  /**
   * @description An enum of the possible transaction payloads
   */
  public readonly payload: AptosEncodeSubmissionRequestPayloadValue;
  /**
   * @description Secondary signer accounts of the request for Multi-agent
   */
  public readonly secondarySigners: string[];

  private constructor(input: AptosEncodeSubmissionRequestInput) {
    this.sender = AptosAddress.create(input.sender);
    this.sequenceNumber = input.sequenceNumber;
    this.maxGasAmount = input.maxGasAmount;
    this.gasUnitPrice = input.gasUnitPrice;
    this.expirationTimestampSecs = input.expirationTimestampSecs;
    this.payload = AptosEncodeSubmissionRequestPayload.create(input.payload);
    this.secondarySigners = input.secondarySigners;
  }

  public toJSON(): AptosEncodeSubmissionRequestJSON {
    return {
      sender: this.sender.toJSON(),
      sequence_number: this.sequenceNumber,
      max_gas_amount: this.maxGasAmount,
      gas_unit_price: this.gasUnitPrice,
      expiration_timestamp_secs: this.expirationTimestampSecs,
      payload: this.payload.toJSON(),
      secondary_signers: this.secondarySigners,
    }
  }
}
