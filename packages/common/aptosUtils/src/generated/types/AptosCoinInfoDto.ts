import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/CoinInfoDto
// type: CoinInfoDto
// properties:
// - coin_type ($ref: #/components/schemas/CoinInfoDto/properties/coin_type)
// - coin_type_hash ($ref: #/components/schemas/CoinInfoDto/properties/coin_type_hash)
// - creator_address ($ref: #/components/schemas/CoinInfoDto/properties/creator_address)
// - decimals ($ref: #/components/schemas/CoinInfoDto/properties/decimals)
// - name ($ref: #/components/schemas/CoinInfoDto/properties/name)
// - supply_aggregator_table_handle ($ref: #/components/schemas/CoinInfoDto/properties/supply_aggregator_table_handle)
// - supply_aggregator_table_key ($ref: #/components/schemas/CoinInfoDto/properties/supply_aggregator_table_key)
// - symbol ($ref: #/components/schemas/CoinInfoDto/properties/symbol)
// - transaction_created_timestamp ($ref: #/components/schemas/CoinInfoDto/properties/transaction_created_timestamp)
// - transaction_version_created ($ref: #/components/schemas/CoinInfoDto/properties/transaction_version_created)

export interface AptosCoinInfoDtoJSON {
  readonly coin_type: string;
  readonly coin_type_hash: string;
  readonly creator_address: AptosAddressJSON;
  readonly decimals: number;
  readonly name: string;
  readonly supply_aggregator_table_handle: string;
  readonly supply_aggregator_table_key: string;
  readonly symbol: string;
  readonly transaction_created_timestamp: string;
  readonly transaction_version_created: string;
}

export interface AptosCoinInfoDtoInput {
  readonly coinType: string;
  readonly coinTypeHash: string;
  readonly creatorAddress: AptosAddressInput | AptosAddress;
  readonly decimals: number;
  readonly name: string;
  readonly supplyAggregatorTableHandle: string;
  readonly supplyAggregatorTableKey: string;
  readonly symbol: string;
  readonly transactionCreatedTimestamp: string;
  readonly transactionVersionCreated: string;
}

export class AptosCoinInfoDto {
  public static create(input: AptosCoinInfoDtoInput | AptosCoinInfoDto): AptosCoinInfoDto {
    if (input instanceof AptosCoinInfoDto) {
      return input;
    }
    return new AptosCoinInfoDto(input);
  }

  public static fromJSON(json: AptosCoinInfoDtoJSON): AptosCoinInfoDto {
    const input: AptosCoinInfoDtoInput = {
      coinType: json.coin_type,
      coinTypeHash: json.coin_type_hash,
      creatorAddress: AptosAddress.fromJSON(json.creator_address),
      decimals: json.decimals,
      name: json.name,
      supplyAggregatorTableHandle: json.supply_aggregator_table_handle,
      supplyAggregatorTableKey: json.supply_aggregator_table_key,
      symbol: json.symbol,
      transactionCreatedTimestamp: json.transaction_created_timestamp,
      transactionVersionCreated: json.transaction_version_created,
    };
    return AptosCoinInfoDto.create(input);
  }

  /**
   * @description The definition of the coin structure (identifier)
   */
  public readonly coinType: string;
  /**
   * @description The hash of the coin_type (identifier) and a known fixed length
   */
  public readonly coinTypeHash: string;
  /**
   * @description The address of the creator of the coin
   */
  public readonly creatorAddress: AptosAddress;
  /**
   * @description The number of decimals of the coin
   */
  public readonly decimals: number;
  /**
   * @description The name of the Coin
   */
  public readonly name: string;
  /**
   * @description The data structure of the token
   */
  public readonly supplyAggregatorTableHandle: string;
  /**
   * @description The data structure of the token
   */
  public readonly supplyAggregatorTableKey: string;
  /**
   * @description The symbol of the coin
   */
  public readonly symbol: string;
  /**
   * @description The timestamp of the transaction of when the coin was created
   */
  public readonly transactionCreatedTimestamp: string;
  /**
   * @description The version of the transaction where the coin was created
   */
  public readonly transactionVersionCreated: string;

  private constructor(input: AptosCoinInfoDtoInput) {
    this.coinType = input.coinType;
    this.coinTypeHash = input.coinTypeHash;
    this.creatorAddress = AptosAddress.create(input.creatorAddress);
    this.decimals = input.decimals;
    this.name = input.name;
    this.supplyAggregatorTableHandle = input.supplyAggregatorTableHandle;
    this.supplyAggregatorTableKey = input.supplyAggregatorTableKey;
    this.symbol = input.symbol;
    this.transactionCreatedTimestamp = input.transactionCreatedTimestamp;
    this.transactionVersionCreated = input.transactionVersionCreated;
  }

  public toJSON(): AptosCoinInfoDtoJSON {
    return {
      coin_type: this.coinType,
      coin_type_hash: this.coinTypeHash,
      creator_address: this.creatorAddress.toJSON(),
      decimals: this.decimals,
      name: this.name,
      supply_aggregator_table_handle: this.supplyAggregatorTableHandle,
      supply_aggregator_table_key: this.supplyAggregatorTableKey,
      symbol: this.symbol,
      transaction_created_timestamp: this.transactionCreatedTimestamp,
      transaction_version_created: this.transactionVersionCreated,
    }
  }
}
