import { EvmDefiPositionDetailsNftMetadata, EvmDefiPositionDetailsNftMetadataValue, EvmDefiPositionDetailsNftMetadataInput, EvmDefiPositionDetailsNftMetadataJSON } from '../types/EvmDefiPositionDetailsNftMetadata';

// $ref: #/components/schemas/defiPositionDetails
// type: defiPositionDetails
// properties:
// - fee_tier ($ref: #/components/schemas/defiPositionDetails/properties/fee_tier)
// - range_tnd ($ref: #/components/schemas/defiPositionDetails/properties/range_tnd)
// - reserves ($ref: #/components/schemas/defiPositionDetails/properties/reserves)
// - current_price ($ref: #/components/schemas/defiPositionDetails/properties/current_price)
// - is_in_range ($ref: #/components/schemas/defiPositionDetails/properties/is_in_range)
// - price_upper ($ref: #/components/schemas/defiPositionDetails/properties/price_upper)
// - price_lower ($ref: #/components/schemas/defiPositionDetails/properties/price_lower)
// - price_label ($ref: #/components/schemas/defiPositionDetails/properties/price_label)
// - liquidity ($ref: #/components/schemas/defiPositionDetails/properties/liquidity)
// - range_start ($ref: #/components/schemas/defiPositionDetails/properties/range_start)
// - pool_address ($ref: #/components/schemas/defiPositionDetails/properties/pool_address)
// - position_key ($ref: #/components/schemas/defiPositionDetails/properties/position_key)
// - nft_metadata ($ref: #/components/schemas/defiPositionDetails/properties/nft_metadata)
// - asset_standard ($ref: #/components/schemas/defiPositionDetails/properties/asset_standard)
// - apy ($ref: #/components/schemas/defiPositionDetails/properties/apy)
// - is_debt ($ref: #/components/schemas/defiPositionDetails/properties/is_debt)
// - is_variable_debt ($ref: #/components/schemas/defiPositionDetails/properties/is_variable_debt)
// - is_stable_debt ($ref: #/components/schemas/defiPositionDetails/properties/is_stable_debt)
// - shares ($ref: #/components/schemas/defiPositionDetails/properties/shares)
// - reserve0 ($ref: #/components/schemas/defiPositionDetails/properties/reserve0)
// - reserve1 ($ref: #/components/schemas/defiPositionDetails/properties/reserve1)
// - factory ($ref: #/components/schemas/defiPositionDetails/properties/factory)
// - pair ($ref: #/components/schemas/defiPositionDetails/properties/pair)
// - share_of_pool ($ref: #/components/schemas/defiPositionDetails/properties/share_of_pool)
// - no_price_available ($ref: #/components/schemas/defiPositionDetails/properties/no_price_available)
// - shares_in_strategy ($ref: #/components/schemas/defiPositionDetails/properties/shares_in_strategy)
// - strategy_address ($ref: #/components/schemas/defiPositionDetails/properties/strategy_address)
// - base_type ($ref: #/components/schemas/defiPositionDetails/properties/base_type)
// - health_factor ($ref: #/components/schemas/defiPositionDetails/properties/health_factor)

export interface EvmDefiPositionDetailsJSON {
  readonly fee_tier?: number;
  readonly range_tnd?: number;
  readonly reserves?: string[];
  readonly current_price?: number;
  readonly is_in_range?: boolean;
  readonly price_upper?: number;
  readonly price_lower?: number;
  readonly price_label?: string;
  readonly liquidity?: number;
  readonly range_start?: number;
  readonly pool_address?: string;
  readonly position_key?: string;
  readonly nft_metadata?: EvmDefiPositionDetailsNftMetadataJSON;
  readonly asset_standard?: string;
  readonly apy?: number;
  readonly is_debt?: boolean;
  readonly is_variable_debt?: boolean;
  readonly is_stable_debt?: boolean;
  readonly shares?: string;
  readonly reserve0?: string;
  readonly reserve1?: string;
  readonly factory?: string;
  readonly pair?: string;
  readonly share_of_pool?: number;
  readonly no_price_available?: boolean;
  readonly shares_in_strategy?: string;
  readonly strategy_address?: string;
  readonly base_type?: string;
  readonly health_factor?: number;
}

export interface EvmDefiPositionDetailsInput {
  readonly feeTier?: number;
  readonly rangeTnd?: number;
  readonly reserves?: string[];
  readonly currentPrice?: number;
  readonly isInRange?: boolean;
  readonly priceUpper?: number;
  readonly priceLower?: number;
  readonly priceLabel?: string;
  readonly liquidity?: number;
  readonly rangeStart?: number;
  readonly poolAddress?: string;
  readonly positionKey?: string;
  readonly nftMetadata?: EvmDefiPositionDetailsNftMetadataInput | EvmDefiPositionDetailsNftMetadataValue;
  readonly assetStandard?: string;
  readonly apy?: number;
  readonly isDebt?: boolean;
  readonly isVariableDebt?: boolean;
  readonly isStableDebt?: boolean;
  readonly shares?: string;
  readonly reserve0?: string;
  readonly reserve1?: string;
  readonly factory?: string;
  readonly pair?: string;
  readonly shareOfPool?: number;
  readonly noPriceAvailable?: boolean;
  readonly sharesInStrategy?: string;
  readonly strategyAddress?: string;
  readonly baseType?: string;
  readonly healthFactor?: number;
}

export class EvmDefiPositionDetails {
  public static create(input: EvmDefiPositionDetailsInput | EvmDefiPositionDetails): EvmDefiPositionDetails {
    if (input instanceof EvmDefiPositionDetails) {
      return input;
    }
    return new EvmDefiPositionDetails(input);
  }

  public static fromJSON(json: EvmDefiPositionDetailsJSON): EvmDefiPositionDetails {
    const input: EvmDefiPositionDetailsInput = {
      feeTier: json.fee_tier,
      rangeTnd: json.range_tnd,
      reserves: json.reserves,
      currentPrice: json.current_price,
      isInRange: json.is_in_range,
      priceUpper: json.price_upper,
      priceLower: json.price_lower,
      priceLabel: json.price_label,
      liquidity: json.liquidity,
      rangeStart: json.range_start,
      poolAddress: json.pool_address,
      positionKey: json.position_key,
      nftMetadata: json.nft_metadata ? EvmDefiPositionDetailsNftMetadata.fromJSON(json.nft_metadata) : undefined,
      assetStandard: json.asset_standard,
      apy: json.apy,
      isDebt: json.is_debt,
      isVariableDebt: json.is_variable_debt,
      isStableDebt: json.is_stable_debt,
      shares: json.shares,
      reserve0: json.reserve0,
      reserve1: json.reserve1,
      factory: json.factory,
      pair: json.pair,
      shareOfPool: json.share_of_pool,
      noPriceAvailable: json.no_price_available,
      sharesInStrategy: json.shares_in_strategy,
      strategyAddress: json.strategy_address,
      baseType: json.base_type,
      healthFactor: json.health_factor,
    };
    return EvmDefiPositionDetails.create(input);
  }

  /**
   * @description The fee tier of the position
   */
  public readonly feeTier?: number;
  /**
   * @description The range trend of the position
   */
  public readonly rangeTnd?: number;
  /**
   * @description The reserves of the position
   */
  public readonly reserves?: string[];
  /**
   * @description The current price of the position
   */
  public readonly currentPrice?: number;
  /**
   * @description Whether the position is in range
   */
  public readonly isInRange?: boolean;
  /**
   * @description The upper price of the range
   */
  public readonly priceUpper?: number;
  /**
   * @description The lower price of the range
   */
  public readonly priceLower?: number;
  /**
   * @description The price label
   */
  public readonly priceLabel?: string;
  /**
   * @description The liquidity of the position
   */
  public readonly liquidity?: number;
  /**
   * @description The start of the range
   */
  public readonly rangeStart?: number;
  /**
   * @description The address of the pool
   */
  public readonly poolAddress?: string;
  /**
   * @description The key of the position
   */
  public readonly positionKey?: string;
  /**
   * @description Metadata of the NFT
   */
  public readonly nftMetadata?: EvmDefiPositionDetailsNftMetadataValue;
  /**
   * @description The standard of the asset
   */
  public readonly assetStandard?: string;
  /**
   * @description The annual percentage yield
   */
  public readonly apy?: number;
  /**
   * @description Whether the position is a debt
   */
  public readonly isDebt?: boolean;
  /**
   * @description Whether the position is a variable debt
   */
  public readonly isVariableDebt?: boolean;
  /**
   * @description Whether the position is a stable debt
   */
  public readonly isStableDebt?: boolean;
  /**
   * @description The shares of the position
   */
  public readonly shares?: string;
  /**
   * @description The first reserve of the position
   */
  public readonly reserve0?: string;
  /**
   * @description The second reserve of the position
   */
  public readonly reserve1?: string;
  /**
   * @description The factory of the position
   */
  public readonly factory?: string;
  /**
   * @description The pair of the position
   */
  public readonly pair?: string;
  /**
   * @description The share of the pool
   */
  public readonly shareOfPool?: number;
  /**
   * @description Whether the price is available
   */
  public readonly noPriceAvailable?: boolean;
  /**
   * @description The shares in the strategy
   */
  public readonly sharesInStrategy?: string;
  /**
   * @description The address of the strategy
   */
  public readonly strategyAddress?: string;
  /**
   * @description The base type of the position
   */
  public readonly baseType?: string;
  /**
   * @description The health factor of the position
   */
  public readonly healthFactor?: number;

  private constructor(input: EvmDefiPositionDetailsInput) {
    this.feeTier = input.feeTier;
    this.rangeTnd = input.rangeTnd;
    this.reserves = input.reserves;
    this.currentPrice = input.currentPrice;
    this.isInRange = input.isInRange;
    this.priceUpper = input.priceUpper;
    this.priceLower = input.priceLower;
    this.priceLabel = input.priceLabel;
    this.liquidity = input.liquidity;
    this.rangeStart = input.rangeStart;
    this.poolAddress = input.poolAddress;
    this.positionKey = input.positionKey;
    this.nftMetadata = input.nftMetadata ? EvmDefiPositionDetailsNftMetadata.create(input.nftMetadata) : undefined;
    this.assetStandard = input.assetStandard;
    this.apy = input.apy;
    this.isDebt = input.isDebt;
    this.isVariableDebt = input.isVariableDebt;
    this.isStableDebt = input.isStableDebt;
    this.shares = input.shares;
    this.reserve0 = input.reserve0;
    this.reserve1 = input.reserve1;
    this.factory = input.factory;
    this.pair = input.pair;
    this.shareOfPool = input.shareOfPool;
    this.noPriceAvailable = input.noPriceAvailable;
    this.sharesInStrategy = input.sharesInStrategy;
    this.strategyAddress = input.strategyAddress;
    this.baseType = input.baseType;
    this.healthFactor = input.healthFactor;
  }

  public toJSON(): EvmDefiPositionDetailsJSON {
    return {
      fee_tier: this.feeTier,
      range_tnd: this.rangeTnd,
      reserves: this.reserves,
      current_price: this.currentPrice,
      is_in_range: this.isInRange,
      price_upper: this.priceUpper,
      price_lower: this.priceLower,
      price_label: this.priceLabel,
      liquidity: this.liquidity,
      range_start: this.rangeStart,
      pool_address: this.poolAddress,
      position_key: this.positionKey,
      nft_metadata: this.nftMetadata ? this.nftMetadata : undefined,
      asset_standard: this.assetStandard,
      apy: this.apy,
      is_debt: this.isDebt,
      is_variable_debt: this.isVariableDebt,
      is_stable_debt: this.isStableDebt,
      shares: this.shares,
      reserve0: this.reserve0,
      reserve1: this.reserve1,
      factory: this.factory,
      pair: this.pair,
      share_of_pool: this.shareOfPool,
      no_price_available: this.noPriceAvailable,
      shares_in_strategy: this.sharesInStrategy,
      strategy_address: this.strategyAddress,
      base_type: this.baseType,
      health_factor: this.healthFactor,
    }
  }
}
