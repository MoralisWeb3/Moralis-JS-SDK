// $ref: #/components/schemas/ohlcIntervalList
// typeName: ohlcIntervalList

export type EvmOhlcIntervalListJSON = "10m" | "30m" | "1h" | "4h" | "12h" | "1d" | "7d" | "30d";
export type EvmOhlcIntervalListInput = "10m" | "30m" | "1h" | "4h" | "12h" | "1d" | "7d" | "30d";
export type EvmOhlcIntervalListValue = "10m" | "30m" | "1h" | "4h" | "12h" | "1d" | "7d" | "30d";

export abstract class EvmOhlcIntervalList {
  public static create(input: EvmOhlcIntervalListInput | EvmOhlcIntervalListValue): EvmOhlcIntervalListValue {
    return input;
  }

  public static fromJSON(json: EvmOhlcIntervalListJSON): EvmOhlcIntervalListValue {
    return json;
  }
}
