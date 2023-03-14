import { AptosNative, AptosNativeInput, AptosNativeJSON, AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/HistoricalCoinBalanceDto
// type: HistoricalCoinBalanceDto
// properties:
// - amount ($ref: #/components/schemas/HistoricalCoinBalanceDto/properties/amount)
// - coin_type ($ref: #/components/schemas/HistoricalCoinBalanceDto/properties/coin_type)
// - coin_type_hash ($ref: #/components/schemas/HistoricalCoinBalanceDto/properties/coin_type_hash)
// - transaction_timestamp ($ref: #/components/schemas/HistoricalCoinBalanceDto/properties/transaction_timestamp)
// - transaction_version ($ref: #/components/schemas/HistoricalCoinBalanceDto/properties/transaction_version)
// - owner_address ($ref: #/components/schemas/HistoricalCoinBalanceDto/properties/owner_address)

export interface AptosHistoricalCoinBalanceDtoJSON {
  readonly amount: AptosNativeJSON;
  readonly coin_type: string;
  readonly coin_type_hash: string;
  readonly transaction_timestamp: string;
  readonly transaction_version: string;
  readonly owner_address: AptosAddressJSON;
}

export interface AptosHistoricalCoinBalanceDtoInput {
  readonly amount: AptosNativeInput | AptosNative;
  readonly coinType: string;
  readonly coinTypeHash: string;
  readonly transactionTimestamp: string;
  readonly transactionVersion: string;
  readonly ownerAddress: AptosAddressInput | AptosAddress;
}

export class AptosHistoricalCoinBalanceDto {
  public static create(input: AptosHistoricalCoinBalanceDtoInput | AptosHistoricalCoinBalanceDto): AptosHistoricalCoinBalanceDto {
    if (input instanceof AptosHistoricalCoinBalanceDto) {
      return input;
    }
    return new AptosHistoricalCoinBalanceDto(input);
  }

  public static fromJSON(json: AptosHistoricalCoinBalanceDtoJSON): AptosHistoricalCoinBalanceDto {
    const input: AptosHistoricalCoinBalanceDtoInput = {
      amount: AptosNative.fromJSON(json.amount),
      coinType: json.coin_type,
      coinTypeHash: json.coin_type_hash,
      transactionTimestamp: json.transaction_timestamp,
      transactionVersion: json.transaction_version,
      ownerAddress: AptosAddress.fromJSON(json.owner_address),
    };
    return AptosHistoricalCoinBalanceDto.create(input);
  }

  /**
   * @description The amount being transfered
   */
  public readonly amount: AptosNative;
  /**
   * @description The definition of the coin structure (identifier)
   */
  public readonly coinType: string;
  /**
   * @description The hash of the coin_type (identifier) and a known fixed length
   */
  public readonly coinTypeHash: string;
  /**
   * @description The timestamp of the updated balance
   */
  public readonly transactionTimestamp: string;
  /**
   * @description The version of the transaction where the balacne was updated
   */
  public readonly transactionVersion: string;
  /**
   * @description The address of the owner of the coin
   */
  public readonly ownerAddress: AptosAddress;

  private constructor(input: AptosHistoricalCoinBalanceDtoInput) {
    this.amount = AptosNative.create(input.amount);
    this.coinType = input.coinType;
    this.coinTypeHash = input.coinTypeHash;
    this.transactionTimestamp = input.transactionTimestamp;
    this.transactionVersion = input.transactionVersion;
    this.ownerAddress = AptosAddress.create(input.ownerAddress);
  }

  public toJSON(): AptosHistoricalCoinBalanceDtoJSON {
    return {
      amount: this.amount.toJSON(),
      coin_type: this.coinType,
      coin_type_hash: this.coinTypeHash,
      transaction_timestamp: this.transactionTimestamp,
      transaction_version: this.transactionVersion,
      owner_address: this.ownerAddress.toJSON(),
    }
  }
}
