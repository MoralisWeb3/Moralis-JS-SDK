// $ref: #/components/schemas/erc20Metadata/properties/links
// typeName: erc20Metadata_links

export type EvmErc20MetadataLinksJSON = object;
export type EvmErc20MetadataLinksInput = object;
export type EvmErc20MetadataLinksValue = object;

export abstract class EvmErc20MetadataLinks {
  public static create(input: EvmErc20MetadataLinksInput | EvmErc20MetadataLinksValue): EvmErc20MetadataLinksValue {
    return input;
  }

  public static fromJSON(json: EvmErc20MetadataLinksJSON): EvmErc20MetadataLinksValue {
    return json;
  }
}
