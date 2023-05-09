import { EvmMarketDataERC20TokenItem, EvmMarketDataERC20TokenItemInput, EvmMarketDataERC20TokenItemJSON } from '../types/EvmMarketDataERC20TokenItem';

// $ref: #/components/schemas/marketDataERC20TokensByPriceMovers
// type: marketDataERC20TokensByPriceMovers
// properties:
// - gainers ($ref: #/components/schemas/marketDataERC20Token/items)
// - losers ($ref: #/components/schemas/marketDataERC20Token/items)

export interface EvmMarketDataERC20TokensByPriceMoversJSON {
  readonly gainers: EvmMarketDataERC20TokenItemJSON[];
  readonly losers: EvmMarketDataERC20TokenItemJSON[];
}

export interface EvmMarketDataERC20TokensByPriceMoversInput {
  readonly gainers: EvmMarketDataERC20TokenItemInput[] | EvmMarketDataERC20TokenItem[];
  readonly losers: EvmMarketDataERC20TokenItemInput[] | EvmMarketDataERC20TokenItem[];
}

export class EvmMarketDataERC20TokensByPriceMovers {
  public static create(input: EvmMarketDataERC20TokensByPriceMoversInput | EvmMarketDataERC20TokensByPriceMovers): EvmMarketDataERC20TokensByPriceMovers {
    if (input instanceof EvmMarketDataERC20TokensByPriceMovers) {
      return input;
    }
    return new EvmMarketDataERC20TokensByPriceMovers(input);
  }

  public static fromJSON(json: EvmMarketDataERC20TokensByPriceMoversJSON): EvmMarketDataERC20TokensByPriceMovers {
    const input: EvmMarketDataERC20TokensByPriceMoversInput = {
      gainers: json.gainers.map((item) => EvmMarketDataERC20TokenItem.fromJSON(item)),
      losers: json.losers.map((item) => EvmMarketDataERC20TokenItem.fromJSON(item)),
    };
    return EvmMarketDataERC20TokensByPriceMovers.create(input);
  }

  public readonly gainers: EvmMarketDataERC20TokenItem[];
  public readonly losers: EvmMarketDataERC20TokenItem[];

  private constructor(input: EvmMarketDataERC20TokensByPriceMoversInput) {
    this.gainers = input.gainers.map((item) => EvmMarketDataERC20TokenItem.create(item));
    this.losers = input.losers.map((item) => EvmMarketDataERC20TokenItem.create(item));
  }

  public toJSON(): EvmMarketDataERC20TokensByPriceMoversJSON {
    return {
      gainers: this.gainers.map((item) => item.toJSON()),
      losers: this.losers.map((item) => item.toJSON()),
    }
  }
}
