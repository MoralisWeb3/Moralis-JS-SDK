// $ref: #/paths/~1token~1{network}~1{address}~1metadata/get/parameters/0/schema
// typeName: getTokenMetadata_network_Enum

export type SolGetTokenMetadataNetworkEnumJSON = "mainnet" | "devnet";
export type SolGetTokenMetadataNetworkEnumInput = "mainnet" | "devnet";
export type SolGetTokenMetadataNetworkEnumValue = "mainnet" | "devnet";

export abstract class SolGetTokenMetadataNetworkEnum {
  public static create(input: SolGetTokenMetadataNetworkEnumInput | SolGetTokenMetadataNetworkEnumValue): SolGetTokenMetadataNetworkEnumValue {
    return input;
  }

  public static fromJSON(json: SolGetTokenMetadataNetworkEnumJSON): SolGetTokenMetadataNetworkEnumValue {
    return json;
  }
}
