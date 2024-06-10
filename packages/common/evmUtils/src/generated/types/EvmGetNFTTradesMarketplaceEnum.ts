// $ref: #/paths/~1nft~1{address}~1trades/get/parameters/5/schema
// typeName: getNFTTrades_marketplace_Enum

export type EvmGetNFTTradesMarketplaceEnumJSON = "opensea" | "blur" | "looksrare" | "x2y2" | "0xprotocol";
export type EvmGetNFTTradesMarketplaceEnumInput = "opensea" | "blur" | "looksrare" | "x2y2" | "0xprotocol";
export type EvmGetNFTTradesMarketplaceEnumValue = "opensea" | "blur" | "looksrare" | "x2y2" | "0xprotocol";

export abstract class EvmGetNFTTradesMarketplaceEnum {
  public static create(input: EvmGetNFTTradesMarketplaceEnumInput | EvmGetNFTTradesMarketplaceEnumValue): EvmGetNFTTradesMarketplaceEnumValue {
    return input;
  }

  public static fromJSON(json: EvmGetNFTTradesMarketplaceEnumJSON): EvmGetNFTTradesMarketplaceEnumValue {
    return json;
  }
}
