// $ref: #/components/schemas/chainList
// typeName: chainList

export type EvmChainListJSON = "eth" | "0x1" | "goerli" | "0x5" | "sepolia" | "0xaa36a7" | "polygon" | "0x89" | "mumbai" | "0x13881" | "bsc" | "0x38" | "bsc testnet" | "0x61" | "avalanche" | "0xa86a" | "avalanche testnet" | "0xa869" | "fantom" | "0xfa" | "palm" | "0x2a15c308d" | "cronos" | "0x19" | "cronos testnet" | "0x152" | "arbitrum" | "0xa4b1";
export type EvmChainListInput = "eth" | "0x1" | "goerli" | "0x5" | "sepolia" | "0xaa36a7" | "polygon" | "0x89" | "mumbai" | "0x13881" | "bsc" | "0x38" | "bsc testnet" | "0x61" | "avalanche" | "0xa86a" | "avalanche testnet" | "0xa869" | "fantom" | "0xfa" | "palm" | "0x2a15c308d" | "cronos" | "0x19" | "cronos testnet" | "0x152" | "arbitrum" | "0xa4b1";
export type EvmChainListValue = "eth" | "0x1" | "goerli" | "0x5" | "sepolia" | "0xaa36a7" | "polygon" | "0x89" | "mumbai" | "0x13881" | "bsc" | "0x38" | "bsc testnet" | "0x61" | "avalanche" | "0xa86a" | "avalanche testnet" | "0xa869" | "fantom" | "0xfa" | "palm" | "0x2a15c308d" | "cronos" | "0x19" | "cronos testnet" | "0x152" | "arbitrum" | "0xa4b1";

export abstract class EvmChainList {
  public static create(input: EvmChainListInput | EvmChainListValue): EvmChainListValue {
    return input;
  }

  public static fromJSON(json: EvmChainListJSON): EvmChainListValue {
    return json;
  }
}
