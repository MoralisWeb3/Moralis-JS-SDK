// $ref: #/paths/~1erc20~1prices/post/parameters/1/schema
// typeName: getMultipleTokenPrices_include_Enum

export type EvmGetMultipleTokenPricesIncludeEnumJSON = "percent_change";
export type EvmGetMultipleTokenPricesIncludeEnumInput = "percent_change";
export type EvmGetMultipleTokenPricesIncludeEnumValue = "percent_change";

export abstract class EvmGetMultipleTokenPricesIncludeEnum {
  public static create(input: EvmGetMultipleTokenPricesIncludeEnumInput | EvmGetMultipleTokenPricesIncludeEnumValue): EvmGetMultipleTokenPricesIncludeEnumValue {
    return input;
  }

  public static fromJSON(json: EvmGetMultipleTokenPricesIncludeEnumJSON): EvmGetMultipleTokenPricesIncludeEnumValue {
    return json;
  }
}
