import { AptosNative, AptosNativeInput, AptosNativeJSON, AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/CurrentCoinBalanceDto
// type: CurrentCoinBalanceDto
// properties:
// - amount ($ref: #/components/schemas/CurrentCoinBalanceDto/properties/amount)
// - coin_type ($ref: #/components/schemas/CurrentCoinBalanceDto/properties/coin_type)
// - coin_type_hash ($ref: #/components/schemas/CurrentCoinBalanceDto/properties/coin_type_hash)
// - last_transaction_timestamp ($ref: #/components/schemas/CurrentCoinBalanceDto/properties/last_transaction_timestamp)
// - last_transaction_version ($ref: #/components/schemas/CurrentCoinBalanceDto/properties/last_transaction_version)
// - owner_address ($ref: #/components/schemas/CurrentCoinBalanceDto/properties/owner_address)

export interface AptosCurrentCoinBalanceDtoJSON {
  readonly amount: AptosNativeJSON;
  readonly coin_type: string;
  readonly coin_type_hash: string;
  readonly last_transaction_timestamp: string;
  readonly last_transaction_version: string;
  readonly owner_address: AptosAddressJSON;
}

export interface AptosCurrentCoinBalanceDtoInput {
  readonly amount: AptosNativeInput | AptosNative;
  readonly coinType: string;
  readonly coinTypeHash: string;
  readonly lastTransactionTimestamp: string;
  readonly lastTransactionVersion: string;
  readonly ownerAddress: AptosAddressInput | AptosAddress;
}

export class AptosCurrentCoinBalanceDto {
  public static create(input: AptosCurrentCoinBalanceDtoInput | AptosCurrentCoinBalanceDto): AptosCurrentCoinBalanceDto {
    if (input instanceof AptosCurrentCoinBalanceDto) {
      return input;
    }
    return new AptosCurrentCoinBalanceDto(input);
  }

  public static fromJSON(json: AptosCurrentCoinBalanceDtoJSON): AptosCurrentCoinBalanceDto {
    const input: AptosCurrentCoinBalanceDtoInput = {
      amount: AptosNative.fromJSON(json.amount),
      coinType: json.coin_type,
      coinTypeHash: json.coin_type_hash,
      lastTransactionTimestamp: json.last_transaction_timestamp,
      lastTransactionVersion: json.last_transaction_version,
      ownerAddress: AptosAddress.fromJSON(json.owner_address),
    };
    return AptosCurrentCoinBalanceDto.create(input);
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
   * @description The timestamp of the last update to the balance
   */
  public readonly lastTransactionTimestamp: string;
  /**
   * @description The version of the transaction where the balance was last s
   */
  public readonly lastTransactionVersion: string;
  /**
   * @description The address of the owner of the coin
   */
  public readonly ownerAddress: AptosAddress;

  private constructor(input: AptosCurrentCoinBalanceDtoInput) {
    this.amount = AptosNative.create(input.amount);
    this.coinType = input.coinType;
    this.coinTypeHash = input.coinTypeHash;
    this.lastTransactionTimestamp = input.lastTransactionTimestamp;
    this.lastTransactionVersion = input.lastTransactionVersion;
    this.ownerAddress = AptosAddress.create(input.ownerAddress);
  }

  public toJSON(): AptosCurrentCoinBalanceDtoJSON {
    return {
      amount: this.amount.toJSON(),
      coin_type: this.coinType,
      coin_type_hash: this.coinTypeHash,
      last_transaction_timestamp: this.lastTransactionTimestamp,
      last_transaction_version: this.lastTransactionVersion,
      owner_address: this.ownerAddress.toJSON(),
    }
  }
}
