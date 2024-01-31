// $ref: #/components/schemas/ohlcCandles/items
// type: ohlcCandles_Item
// properties:
// - timestamp ($ref: #/components/schemas/ohlcCandles/items/properties/timestamp)
// - open ($ref: #/components/schemas/ohlcCandles/items/properties/open)
// - high ($ref: #/components/schemas/ohlcCandles/items/properties/high)
// - low ($ref: #/components/schemas/ohlcCandles/items/properties/low)
// - close ($ref: #/components/schemas/ohlcCandles/items/properties/close)
// - volume ($ref: #/components/schemas/ohlcCandles/items/properties/volume)
// - trades ($ref: #/components/schemas/ohlcCandles/items/properties/trades)

export interface EvmOhlcCandlesItemJSON {
  readonly timestamp: string;
  readonly open: number;
  readonly high: number;
  readonly low: number;
  readonly close: number;
  readonly volume: number;
  readonly trades: number;
}

export interface EvmOhlcCandlesItemInput {
  readonly timestamp: Date;
  readonly open: number;
  readonly high: number;
  readonly low: number;
  readonly close: number;
  readonly volume: number;
  readonly trades: number;
}

export class EvmOhlcCandlesItem {
  public static create(input: EvmOhlcCandlesItemInput | EvmOhlcCandlesItem): EvmOhlcCandlesItem {
    if (input instanceof EvmOhlcCandlesItem) {
      return input;
    }
    return new EvmOhlcCandlesItem(input);
  }

  public static fromJSON(json: EvmOhlcCandlesItemJSON): EvmOhlcCandlesItem {
    const input: EvmOhlcCandlesItemInput = {
      timestamp: new Date(json.timestamp),
      open: json.open,
      high: json.high,
      low: json.low,
      close: json.close,
      volume: json.volume,
      trades: json.trades,
    };
    return EvmOhlcCandlesItem.create(input);
  }

  /**
   * @description The timestamp of the candle
   */
  public readonly timestamp: Date;
  /**
   * @description The open price of the candle
   */
  public readonly open: number;
  /**
   * @description The high price of the candle
   */
  public readonly high: number;
  /**
   * @description The low price of the candle
   */
  public readonly low: number;
  /**
   * @description The close price of the candle
   */
  public readonly close: number;
  /**
   * @description The volume of the candle
   */
  public readonly volume: number;
  /**
   * @description The number of trades in the candle
   */
  public readonly trades: number;

  private constructor(input: EvmOhlcCandlesItemInput) {
    this.timestamp = input.timestamp;
    this.open = input.open;
    this.high = input.high;
    this.low = input.low;
    this.close = input.close;
    this.volume = input.volume;
    this.trades = input.trades;
  }

  public toJSON(): EvmOhlcCandlesItemJSON {
    return {
      timestamp: this.timestamp.toISOString(),
      open: this.open,
      high: this.high,
      low: this.low,
      close: this.close,
      volume: this.volume,
      trades: this.trades,
    }
  }
}
