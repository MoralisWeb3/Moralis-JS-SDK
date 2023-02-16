import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosPendingTransactionPayload, AptosPendingTransactionPayloadInput, AptosPendingTransactionPayloadJSON } from '../types/AptosPendingTransactionPayload';
import { AptosPendingTransactionSignature, AptosPendingTransactionSignatureInput, AptosPendingTransactionSignatureJSON } from '../types/AptosPendingTransactionSignature';

// $ref: #/components/schemas/PendingTransaction
// type: PendingTransaction
// properties:
// - hash ($ref: #/components/schemas/PendingTransaction/properties/hash)
// - sender ($ref: #/components/schemas/PendingTransaction/properties/sender)
// - sequence_number ($ref: #/components/schemas/PendingTransaction/properties/sequence_number)
// - max_gas_amount ($ref: #/components/schemas/PendingTransaction/properties/max_gas_amount)
// - gas_unit_price ($ref: #/components/schemas/PendingTransaction/properties/gas_unit_price)
// - expiration_timestamp_secs ($ref: #/components/schemas/PendingTransaction/properties/expiration_timestamp_secs)
// - payload ($ref: #/components/schemas/PendingTransaction/properties/payload)
// - signature ($ref: #/components/schemas/PendingTransaction/properties/signature)

export interface AptosPendingTransactionJSON {
  readonly hash: string;
  readonly sender: AptosAddressJSON;
  readonly sequence_number: string;
  readonly max_gas_amount: string;
  readonly gas_unit_price: string;
  readonly expiration_timestamp_secs: string;
  readonly payload: AptosPendingTransactionPayloadJSON;
  readonly signature: AptosPendingTransactionSignatureJSON;
}

export interface AptosPendingTransactionInput {
  readonly hash: string;
  readonly sender: AptosAddressInput | AptosAddress;
  readonly sequenceNumber: string;
  readonly maxGasAmount: string;
  readonly gasUnitPrice: string;
  readonly expirationTimestampSecs: string;
  readonly payload: AptosPendingTransactionPayloadInput | AptosPendingTransactionPayload;
  readonly signature: AptosPendingTransactionSignatureInput | AptosPendingTransactionSignature;
}

export class AptosPendingTransaction {
  public static create(input: AptosPendingTransactionInput | AptosPendingTransaction): AptosPendingTransaction {
    if (input instanceof AptosPendingTransaction) {
      return input;
    }
    return new AptosPendingTransaction(input);
  }

  public static fromJSON(json: AptosPendingTransactionJSON): AptosPendingTransaction {
    const input: AptosPendingTransactionInput = {
      hash: json.hash,
      sender: AptosAddress.fromJSON(json.sender),
      sequenceNumber: json.sequence_number,
      maxGasAmount: json.max_gas_amount,
      gasUnitPrice: json.gas_unit_price,
      expirationTimestampSecs: json.expiration_timestamp_secs,
      payload: AptosPendingTransactionPayload.fromJSON(json.payload),
      signature: AptosPendingTransactionSignature.fromJSON(json.signature),
    };
    return AptosPendingTransaction.create(input);
  }

  public static isInput(input: any): input is AptosPendingTransactionInput {
    return input.type && input.type.includes('pending');
  }

  public static isJSON(json: any): json is AptosPendingTransactionJSON {
    return json.type && json.type.includes('pending');
  }

  public readonly hash: string;
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
  public readonly payload: AptosPendingTransactionPayload;
  public readonly signature: AptosPendingTransactionSignature;

  private constructor(input: AptosPendingTransactionInput) {
    this.hash = input.hash;
    this.sender = AptosAddress.create(input.sender);
    this.sequenceNumber = input.sequenceNumber;
    this.maxGasAmount = input.maxGasAmount;
    this.gasUnitPrice = input.gasUnitPrice;
    this.expirationTimestampSecs = input.expirationTimestampSecs;
    this.payload = AptosPendingTransactionPayload.create(input.payload);
    this.signature = AptosPendingTransactionSignature.create(input.signature);
  }

  public toJSON(): AptosPendingTransactionJSON {
    return {
      hash: this.hash,
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
