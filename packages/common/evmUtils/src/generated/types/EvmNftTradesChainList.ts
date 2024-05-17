// $ref: #/components/schemas/nftTradesChainList
// typeName: nftTradesChainList

export type EvmNftTradesChainListJSON = "eth" | "0x1" | "polygon" | "0x89" | "bsc" | "0x38" | "avalanche" | "0xa86a" | "arbitrum" | "0xa4b1" | "base" | "0x2105" | "optimism" | "0xa";
export type EvmNftTradesChainListInput = "eth" | "0x1" | "polygon" | "0x89" | "bsc" | "0x38" | "avalanche" | "0xa86a" | "arbitrum" | "0xa4b1" | "base" | "0x2105" | "optimism" | "0xa";
export type EvmNftTradesChainListValue = "eth" | "0x1" | "polygon" | "0x89" | "bsc" | "0x38" | "avalanche" | "0xa86a" | "arbitrum" | "0xa4b1" | "base" | "0x2105" | "optimism" | "0xa";

export abstract class EvmNftTradesChainList {
  public static create(input: EvmNftTradesChainListInput | EvmNftTradesChainListValue): EvmNftTradesChainListValue {
    return input;
  }

  public static fromJSON(json: EvmNftTradesChainListJSON): EvmNftTradesChainListValue {
    return json;
  }
}
