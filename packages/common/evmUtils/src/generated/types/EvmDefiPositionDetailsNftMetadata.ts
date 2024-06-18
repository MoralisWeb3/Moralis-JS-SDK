// $ref: #/components/schemas/defiPositionDetails/properties/nft_metadata
// typeName: defiPositionDetails_nft_metadata

export type EvmDefiPositionDetailsNftMetadataJSON = object;
export type EvmDefiPositionDetailsNftMetadataInput = object;
export type EvmDefiPositionDetailsNftMetadataValue = object;

export abstract class EvmDefiPositionDetailsNftMetadata {
  public static create(input: EvmDefiPositionDetailsNftMetadataInput | EvmDefiPositionDetailsNftMetadataValue): EvmDefiPositionDetailsNftMetadataValue {
    return input;
  }

  public static fromJSON(json: EvmDefiPositionDetailsNftMetadataJSON): EvmDefiPositionDetailsNftMetadataValue {
    return json;
  }
}
