// $ref: #/paths/~1token~1{network}~1{address}~1price/get/parameters/0/schema
// typeName: getTokenPrice_network_Enum

export type SolGetTokenPriceNetworkEnumJSON = "mainnet";
export type SolGetTokenPriceNetworkEnumInput = "mainnet";
export type SolGetTokenPriceNetworkEnumValue = "mainnet";

export abstract class SolGetTokenPriceNetworkEnum {
  public static create(input: SolGetTokenPriceNetworkEnumInput | SolGetTokenPriceNetworkEnumValue): SolGetTokenPriceNetworkEnumValue {
    return input;
  }

  public static fromJSON(json: SolGetTokenPriceNetworkEnumJSON): SolGetTokenPriceNetworkEnumValue {
    return json;
  }
}
