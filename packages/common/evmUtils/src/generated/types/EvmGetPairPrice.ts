import { EvmErc20Metadata, EvmErc20MetadataInput, EvmErc20MetadataJSON } from '../types/EvmErc20Metadata';

// $ref: #/paths/~1{token0_address}~1{token1_address}~1price/get/responses/200/content/application~1json/schema
// type: getPairPrice
// properties:
// - pair_address ($ref: #/paths/~1{token0_address}~1{token1_address}~1price/get/responses/200/content/application~1json/schema/properties/pair_address)
// - pair_label ($ref: #/paths/~1{token0_address}~1{token1_address}~1price/get/responses/200/content/application~1json/schema/properties/pair_label)
// - exchange ($ref: #/paths/~1{token0_address}~1{token1_address}~1price/get/responses/200/content/application~1json/schema/properties/exchange)
// - quote_price ($ref: #/paths/~1{token0_address}~1{token1_address}~1price/get/responses/200/content/application~1json/schema/properties/quote_price)
// - price_usd ($ref: #/paths/~1{token0_address}~1{token1_address}~1price/get/responses/200/content/application~1json/schema/properties/price_usd)
// - base_token ($ref: #/components/schemas/erc20Metadata)
// - quote_token ($ref: #/components/schemas/erc20Metadata)

export interface EvmGetPairPriceJSON {
  readonly pair_address?: string;
  readonly pair_label?: string;
  readonly exchange?: string;
  readonly quote_price?: string;
  readonly price_usd?: string;
  readonly base_token?: EvmErc20MetadataJSON;
  readonly quote_token?: EvmErc20MetadataJSON;
}

export interface EvmGetPairPriceInput {
  readonly pairAddress?: string;
  readonly pairLabel?: string;
  readonly exchange?: string;
  readonly quotePrice?: string;
  readonly priceUsd?: string;
  readonly baseToken?: EvmErc20MetadataInput | EvmErc20Metadata;
  readonly quoteToken?: EvmErc20MetadataInput | EvmErc20Metadata;
}

export class EvmGetPairPrice {
  public static create(input: EvmGetPairPriceInput | EvmGetPairPrice): EvmGetPairPrice {
    if (input instanceof EvmGetPairPrice) {
      return input;
    }
    return new EvmGetPairPrice(input);
  }

  public static fromJSON(json: EvmGetPairPriceJSON): EvmGetPairPrice {
    const input: EvmGetPairPriceInput = {
      pairAddress: json.pair_address,
      pairLabel: json.pair_label,
      exchange: json.exchange,
      quotePrice: json.quote_price,
      priceUsd: json.price_usd,
      baseToken: json.base_token ? EvmErc20Metadata.fromJSON(json.base_token) : undefined,
      quoteToken: json.quote_token ? EvmErc20Metadata.fromJSON(json.quote_token) : undefined,
    };
    return EvmGetPairPrice.create(input);
  }

  public readonly pairAddress?: string;
  public readonly pairLabel?: string;
  public readonly exchange?: string;
  public readonly quotePrice?: string;
  public readonly priceUsd?: string;
  public readonly baseToken?: EvmErc20Metadata;
  public readonly quoteToken?: EvmErc20Metadata;

  private constructor(input: EvmGetPairPriceInput) {
    this.pairAddress = input.pairAddress;
    this.pairLabel = input.pairLabel;
    this.exchange = input.exchange;
    this.quotePrice = input.quotePrice;
    this.priceUsd = input.priceUsd;
    this.baseToken = input.baseToken ? EvmErc20Metadata.create(input.baseToken) : undefined;
    this.quoteToken = input.quoteToken ? EvmErc20Metadata.create(input.quoteToken) : undefined;
  }

  public toJSON(): EvmGetPairPriceJSON {
    return {
      pair_address: this.pairAddress,
      pair_label: this.pairLabel,
      exchange: this.exchange,
      quote_price: this.quotePrice,
      price_usd: this.priceUsd,
      base_token: this.baseToken ? this.baseToken.toJSON() : undefined,
      quote_token: this.quoteToken ? this.quoteToken.toJSON() : undefined,
    }
  }
}
