import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosSubmitTransactionRequestPayload, AptosSubmitTransactionRequestPayloadInput, AptosSubmitTransactionRequestPayloadJSON } from '../types/AptosSubmitTransactionRequestPayload';
import { AptosSubmitTransactionRequestSignature, AptosSubmitTransactionRequestSignatureInput, AptosSubmitTransactionRequestSignatureJSON } from '../types/AptosSubmitTransactionRequestSignature';

// $ref: #/components/schemas/SubmitTransactionRequest
// type: SubmitTransactionRequest
// properties:
// - sender ($ref: #/components/schemas/SubmitTransactionRequest/properties/sender)
// - sequence_number ($ref: #/components/schemas/SubmitTransactionRequest/properties/sequence_number)
// - max_gas_amount ($ref: #/components/schemas/SubmitTransactionRequest/properties/max_gas_amount)
// - gas_unit_price ($ref: #/components/schemas/SubmitTransactionRequest/properties/gas_unit_price)
// - expiration_timestamp_secs ($ref: #/components/schemas/SubmitTransactionRequest/properties/expiration_timestamp_secs)
// - payload ($ref: #/components/schemas/SubmitTransactionRequest/properties/payload)
// - signature ($ref: #/components/schemas/SubmitTransactionRequest/properties/signature)

export interface AptosSubmitTransactionRequestJSON {
  readonly sender: AptosAddressJSON;
  readonly sequence_number: string;
  readonly max_gas_amount: string;
  readonly gas_unit_price: string;
  readonly expiration_timestamp_secs: string;
  readonly payload: AptosSubmitTransactionRequestPayloadJSON;
  readonly signature: AptosSubmitTransactionRequestSignatureJSON;
}

export interface AptosSubmitTransactionRequestInput {
  readonly sender: AptosAddressInput | AptosAddress;
  readonly sequenceNumber: string;
  readonly maxGasAmount: string;
  readonly gasUnitPrice: string;
  readonly expirationTimestampSecs: string;
  readonly payload: AptosSubmitTransactionRequestPayloadInput | AptosSubmitTransactionRequestPayload;
  readonly signature: AptosSubmitTransactionRequestSignatureInput | AptosSubmitTransactionRequestSignature;
}

export class AptosSubmitTransactionRequest {
  public static create(input: AptosSubmitTransactionRequestInput | AptosSubmitTransactionRequest): AptosSubmitTransactionRequest {
    if (input instanceof AptosSubmitTransactionRequest) {
      return input;
    }
    return new AptosSubmitTransactionRequest(input);
  }

  public static fromJSON(json: AptosSubmitTransactionRequestJSON): AptosSubmitTransactionRequest {
    const input: AptosSubmitTransactionRequestInput = {
      sender: AptosAddress.fromJSON(json.sender),
      sequenceNumber: json.sequence_number,
      maxGasAmount: json.max_gas_amount,
      gasUnitPrice: json.gas_unit_price,
      expirationTimestampSecs: json.expiration_timestamp_secs,
      payload: AptosSubmitTransactionRequestPayload.fromJSON(json.payload),
      signature: AptosSubmitTransactionRequestSignature.fromJSON(json.signature),
    };
    return AptosSubmitTransactionRequest.create(input);
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
  public readonly payload: AptosSubmitTransactionRequestPayload;
  public readonly signature: AptosSubmitTransactionRequestSignature;

  private constructor(input: AptosSubmitTransactionRequestInput) {
    this.sender = AptosAddress.create(input.sender);
    this.sequenceNumber = input.sequenceNumber;
    this.maxGasAmount = input.maxGasAmount;
    this.gasUnitPrice = input.gasUnitPrice;
    this.expirationTimestampSecs = input.expirationTimestampSecs;
    this.payload = AptosSubmitTransactionRequestPayload.create(input.payload);
    this.signature = AptosSubmitTransactionRequestSignature.create(input.signature);
  }

  public toJSON(): AptosSubmitTransactionRequestJSON {
    return {
      sender: this.sender.toJSON(),
      sequence_number: this.sequenceNumber,
      max_gas_amount: this.maxGasAmount,
      gas_unit_price: this.gasUnitPrice,
      expiration_timestamp_secs: this.expirationTimestampSecs,
      payload: this.payload.toJSON(),
      signature: this.signature.toJSON(),
    }
  }
}
