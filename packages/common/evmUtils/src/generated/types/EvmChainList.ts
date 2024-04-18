// $ref: #/components/schemas/chainList
// typeName: chainList

export type EvmChainListJSON = "eth" | "0x1" | "goerli" | "0x5" | "sepolia" | "0xaa36a7" | "polygon" | "0x89" | "mumbai" | "0x13881" | "bsc" | "0x38" | "bsc testnet" | "0x61" | "avalanche" | "0xa86a" | "fantom" | "0xfa" | "palm" | "0x2a15c308d" | "cronos" | "0x19" | "arbitrum" | "0xa4b1" | "chiliz" | "0x15b38" | "chiliz testnet" | "0x15b32" | "gnosis" | "0x64" | "gnosis testnet" | "0x27d8" | "base" | "0x2105" | "base testnet" | "0x14a33" | "base sepolia" | "0x14a34" | "optimism" | "0xa" | "holesky" | "0x4268" | "polygon amoy" | "0x13882" | "linea" | "0xe708";
export type EvmChainListInput = "eth" | "0x1" | "goerli" | "0x5" | "sepolia" | "0xaa36a7" | "polygon" | "0x89" | "mumbai" | "0x13881" | "bsc" | "0x38" | "bsc testnet" | "0x61" | "avalanche" | "0xa86a" | "fantom" | "0xfa" | "palm" | "0x2a15c308d" | "cronos" | "0x19" | "arbitrum" | "0xa4b1" | "chiliz" | "0x15b38" | "chiliz testnet" | "0x15b32" | "gnosis" | "0x64" | "gnosis testnet" | "0x27d8" | "base" | "0x2105" | "base testnet" | "0x14a33" | "base sepolia" | "0x14a34" | "optimism" | "0xa" | "holesky" | "0x4268" | "polygon amoy" | "0x13882" | "linea" | "0xe708";
export type EvmChainListValue = "eth" | "0x1" | "goerli" | "0x5" | "sepolia" | "0xaa36a7" | "polygon" | "0x89" | "mumbai" | "0x13881" | "bsc" | "0x38" | "bsc testnet" | "0x61" | "avalanche" | "0xa86a" | "fantom" | "0xfa" | "palm" | "0x2a15c308d" | "cronos" | "0x19" | "arbitrum" | "0xa4b1" | "chiliz" | "0x15b38" | "chiliz testnet" | "0x15b32" | "gnosis" | "0x64" | "gnosis testnet" | "0x27d8" | "base" | "0x2105" | "base testnet" | "0x14a33" | "base sepolia" | "0x14a34" | "optimism" | "0xa" | "holesky" | "0x4268" | "polygon amoy" | "0x13882" | "linea" | "0xe708";

export abstract class EvmChainList {
  public static create(input: EvmChainListInput | EvmChainListValue): EvmChainListValue {
    return input;
  }

  public static fromJSON(json: EvmChainListJSON): EvmChainListValue {
    return json;
  }
}
