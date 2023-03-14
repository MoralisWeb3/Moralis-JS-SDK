import { AptosNative, AptosNativeInput, AptosNativeJSON, AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/CoinTransferDto
// type: CoinTransferDto
// properties:
// - activity_type ($ref: #/components/schemas/CoinTransferDto/properties/activity_type)
// - amount ($ref: #/components/schemas/CoinTransferDto/properties/amount)
// - block_height ($ref: #/components/schemas/CoinTransferDto/properties/block_height)
// - coin_type ($ref: #/components/schemas/CoinTransferDto/properties/coin_type)
// - entry_function_id_str ($ref: #/components/schemas/CoinTransferDto/properties/entry_function_id_str)
// - event_account_address ($ref: #/components/schemas/CoinTransferDto/properties/event_account_address)
// - event_creation_number ($ref: #/components/schemas/CoinTransferDto/properties/event_creation_number)
// - event_sequence_number ($ref: #/components/schemas/CoinTransferDto/properties/event_sequence_number)
// - is_gas_fee ($ref: #/components/schemas/CoinTransferDto/properties/is_gas_fee)
// - is_transaction_success ($ref: #/components/schemas/CoinTransferDto/properties/is_transaction_success)
// - owner_address ($ref: #/components/schemas/CoinTransferDto/properties/owner_address)
// - transaction_timestamp ($ref: #/components/schemas/CoinTransferDto/properties/transaction_timestamp)
// - transaction_version ($ref: #/components/schemas/CoinTransferDto/properties/transaction_version)

export interface AptosCoinTransferDtoJSON {
  readonly activity_type: string;
  readonly amount: AptosNativeJSON;
  readonly block_height: string;
  readonly coin_type: string;
  readonly entry_function_id_str: string;
  readonly event_account_address: string;
  readonly event_creation_number: string;
  readonly event_sequence_number: string;
  readonly is_gas_fee: boolean;
  readonly is_transaction_success: boolean;
  readonly owner_address: AptosAddressJSON;
  readonly transaction_timestamp: string;
  readonly transaction_version: string;
}

export interface AptosCoinTransferDtoInput {
  readonly activityType: string;
  readonly amount: AptosNativeInput | AptosNative;
  readonly blockHeight: string;
  readonly coinType: string;
  readonly entryFunctionIdStr: string;
  readonly eventAccountAddress: string;
  readonly eventCreationNumber: string;
  readonly eventSequenceNumber: string;
  readonly isGasFee: boolean;
  readonly isTransactionSuccess: boolean;
  readonly ownerAddress: AptosAddressInput | AptosAddress;
  readonly transactionTimestamp: string;
  readonly transactionVersion: string;
}

export class AptosCoinTransferDto {
  public static create(input: AptosCoinTransferDtoInput | AptosCoinTransferDto): AptosCoinTransferDto {
    if (input instanceof AptosCoinTransferDto) {
      return input;
    }
    return new AptosCoinTransferDto(input);
  }

  public static fromJSON(json: AptosCoinTransferDtoJSON): AptosCoinTransferDto {
    const input: AptosCoinTransferDtoInput = {
      activityType: json.activity_type,
      amount: AptosNative.fromJSON(json.amount),
      blockHeight: json.block_height,
      coinType: json.coin_type,
      entryFunctionIdStr: json.entry_function_id_str,
      eventAccountAddress: json.event_account_address,
      eventCreationNumber: json.event_creation_number,
      eventSequenceNumber: json.event_sequence_number,
      isGasFee: json.is_gas_fee,
      isTransactionSuccess: json.is_transaction_success,
      ownerAddress: AptosAddress.fromJSON(json.owner_address),
      transactionTimestamp: json.transaction_timestamp,
      transactionVersion: json.transaction_version,
    };
    return AptosCoinTransferDto.create(input);
  }

  /**
   * @description The definition of the coin activity
   */
  public readonly activityType: string;
  /**
   * @description The amount being transfered
   */
  public readonly amount: AptosNative;
  /**
   * @description The blockheight that the transfer was included in
   */
  public readonly blockHeight: string;
  /**
   * @description The definition of the coin structure (identifier)
   */
  public readonly coinType: string;
  /**
   * @description The function that was called to transfer the coin
   */
  public readonly entryFunctionIdStr: string;
  /**
   * @description The address of the event account
   */
  public readonly eventAccountAddress: string;
  /**
   * @description The event creation number
   */
  public readonly eventCreationNumber: string;
  /**
   * @description The sequence number of the event
   */
  public readonly eventSequenceNumber: string;
  /**
   * @description If the transfer was a gas fee or not
   */
  public readonly isGasFee: boolean;
  /**
   * @description If the transfer was successful or not
   */
  public readonly isTransactionSuccess: boolean;
  /**
   * @description The address of the owner of the coin
   */
  public readonly ownerAddress: AptosAddress;
  /**
   * @description The timestamp of the transaction of when the coin was transfered
   */
  public readonly transactionTimestamp: string;
  /**
   * @description The version of the transaction where the coin was transfered
   */
  public readonly transactionVersion: string;

  private constructor(input: AptosCoinTransferDtoInput) {
    this.activityType = input.activityType;
    this.amount = AptosNative.create(input.amount);
    this.blockHeight = input.blockHeight;
    this.coinType = input.coinType;
    this.entryFunctionIdStr = input.entryFunctionIdStr;
    this.eventAccountAddress = input.eventAccountAddress;
    this.eventCreationNumber = input.eventCreationNumber;
    this.eventSequenceNumber = input.eventSequenceNumber;
    this.isGasFee = input.isGasFee;
    this.isTransactionSuccess = input.isTransactionSuccess;
    this.ownerAddress = AptosAddress.create(input.ownerAddress);
    this.transactionTimestamp = input.transactionTimestamp;
    this.transactionVersion = input.transactionVersion;
  }

  public toJSON(): AptosCoinTransferDtoJSON {
    return {
      activity_type: this.activityType,
      amount: this.amount.toJSON(),
      block_height: this.blockHeight,
      coin_type: this.coinType,
      entry_function_id_str: this.entryFunctionIdStr,
      event_account_address: this.eventAccountAddress,
      event_creation_number: this.eventCreationNumber,
      event_sequence_number: this.eventSequenceNumber,
      is_gas_fee: this.isGasFee,
      is_transaction_success: this.isTransactionSuccess,
      owner_address: this.ownerAddress.toJSON(),
      transaction_timestamp: this.transactionTimestamp,
      transaction_version: this.transactionVersion,
    }
  }
}
