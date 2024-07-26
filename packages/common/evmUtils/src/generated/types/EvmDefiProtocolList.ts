// $ref: #/components/schemas/defiProtocolList
// typeName: defiProtocolList

export type EvmDefiProtocolListJSON = "uniswap-v2" | "uniswap-v3" | "pancakeswap-v2" | "pancakeswap-v3" | "quickswap-v2" | "sushiswap-v2" | "aave-v2" | "aave-v3" | "fraxswap-v1" | "fraxswap-v2" | "lido" | "makerdao" | "eigenlayer" | "pendle" | "etherfi" | "rocketpool" | "sparkfi";
export type EvmDefiProtocolListInput = "uniswap-v2" | "uniswap-v3" | "pancakeswap-v2" | "pancakeswap-v3" | "quickswap-v2" | "sushiswap-v2" | "aave-v2" | "aave-v3" | "fraxswap-v1" | "fraxswap-v2" | "lido" | "makerdao" | "eigenlayer" | "pendle" | "etherfi" | "rocketpool" | "sparkfi";
export type EvmDefiProtocolListValue = "uniswap-v2" | "uniswap-v3" | "pancakeswap-v2" | "pancakeswap-v3" | "quickswap-v2" | "sushiswap-v2" | "aave-v2" | "aave-v3" | "fraxswap-v1" | "fraxswap-v2" | "lido" | "makerdao" | "eigenlayer" | "pendle" | "etherfi" | "rocketpool" | "sparkfi";

export abstract class EvmDefiProtocolList {
  public static create(input: EvmDefiProtocolListInput | EvmDefiProtocolListValue): EvmDefiProtocolListValue {
    return input;
  }

  public static fromJSON(json: EvmDefiProtocolListJSON): EvmDefiProtocolListValue {
    return json;
  }
}
