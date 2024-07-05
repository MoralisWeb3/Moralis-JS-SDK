// $ref: #/components/schemas/discoveryApiChainsList
// typeName: discoveryApiChainsList

export type EvmDiscoveryApiChainsListJSON = "eth" | "mainnet" | "0x1" | "matic" | "0x89" | "polygon" | "bsc" | "binance" | "0x38" | "fantom" | "ftm" | "0xfa" | "arbitrum" | "0xa4b1" | "optimism" | "0xa" | "pulsechain" | "0x171" | "base" | "0x2105" | "linea" | "0xe708";
export type EvmDiscoveryApiChainsListInput = "eth" | "mainnet" | "0x1" | "matic" | "0x89" | "polygon" | "bsc" | "binance" | "0x38" | "fantom" | "ftm" | "0xfa" | "arbitrum" | "0xa4b1" | "optimism" | "0xa" | "pulsechain" | "0x171" | "base" | "0x2105" | "linea" | "0xe708";
export type EvmDiscoveryApiChainsListValue = "eth" | "mainnet" | "0x1" | "matic" | "0x89" | "polygon" | "bsc" | "binance" | "0x38" | "fantom" | "ftm" | "0xfa" | "arbitrum" | "0xa4b1" | "optimism" | "0xa" | "pulsechain" | "0x171" | "base" | "0x2105" | "linea" | "0xe708";

export abstract class EvmDiscoveryApiChainsList {
  public static create(input: EvmDiscoveryApiChainsListInput | EvmDiscoveryApiChainsListValue): EvmDiscoveryApiChainsListValue {
    return input;
  }

  public static fromJSON(json: EvmDiscoveryApiChainsListJSON): EvmDiscoveryApiChainsListValue {
    return json;
  }
}
