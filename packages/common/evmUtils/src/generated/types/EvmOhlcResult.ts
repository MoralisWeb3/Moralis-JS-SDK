import { EvmOhlcCandlesItem, EvmOhlcCandlesItemInput, EvmOhlcCandlesItemJSON } from '../types/EvmOhlcCandlesItem';

// $ref: #/components/schemas/ohlcResult
// type: ohlcResult
// properties:
// - pair_address ($ref: #/components/schemas/ohlcResult/properties/pair_address)
// - pair_label ($ref: #/components/schemas/ohlcResult/properties/pair_label)
// - exchange ($ref: #/components/schemas/ohlcResult/properties/exchange)
// - quote_currency ($ref: #/components/schemas/ohlcResult/properties/quote_currency)
// - interval ($ref: #/components/schemas/ohlcResult/properties/interval)
// - candles ($ref: #/components/schemas/ohlcCandles/items)

export interface EvmOhlcResultJSON {
  readonly pair_address: string;
  readonly pair_label: string;
  readonly exchange: string;
  readonly quote_currency: string;
  readonly interval: string;
  readonly candles: EvmOhlcCandlesItemJSON[];
}

export interface EvmOhlcResultInput {
  readonly pairAddress: string;
  readonly pairLabel: string;
  readonly exchange: string;
  readonly quoteCurrency: string;
  readonly interval: string;
  readonly candles: EvmOhlcCandlesItemInput[] | EvmOhlcCandlesItem[];
}

export class EvmOhlcResult {
  public static create(input: EvmOhlcResultInput | EvmOhlcResult): EvmOhlcResult {
    if (input instanceof EvmOhlcResult) {
      return input;
    }
    return new EvmOhlcResult(input);
  }

  public static fromJSON(json: EvmOhlcResultJSON): EvmOhlcResult {
    const input: EvmOhlcResultInput = {
      pairAddress: json.pair_address,
      pairLabel: json.pair_label,
      exchange: json.exchange,
      quoteCurrency: json.quote_currency,
      interval: json.interval,
      candles: json.candles.map((item) => EvmOhlcCandlesItem.fromJSON(item)),
    };
    return EvmOhlcResult.create(input);
  }

  /**
   * @description The address of the pair
   */
  public readonly pairAddress: string;
  /**
   * @description The label of the pair
   */
  public readonly pairLabel: string;
  /**
   * @description The exchange of the pair
   */
  public readonly exchange: string;
  /**
   * @description The quote currency of the pair
   */
  public readonly quoteCurrency: string;
  /**
   * @description The interval of the candles
   */
  public readonly interval: string;
  public readonly candles: EvmOhlcCandlesItem[];

  private constructor(input: EvmOhlcResultInput) {
    this.pairAddress = input.pairAddress;
    this.pairLabel = input.pairLabel;
    this.exchange = input.exchange;
    this.quoteCurrency = input.quoteCurrency;
    this.interval = input.interval;
    this.candles = input.candles.map((item) => EvmOhlcCandlesItem.create(item));
  }

  public toJSON(): EvmOhlcResultJSON {
    return {
      pair_address: this.pairAddress,
      pair_label: this.pairLabel,
      exchange: this.exchange,
      quote_currency: this.quoteCurrency,
      interval: this.interval,
      candles: this.candles.map((item) => item.toJSON()),
    }
  }
}
