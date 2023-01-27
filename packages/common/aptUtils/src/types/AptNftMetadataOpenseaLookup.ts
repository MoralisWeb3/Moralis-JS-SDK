// $ref: #/components/schemas/nftMetadata/properties/opensea_lookup

export type AptNftMetadataOpenseaLookupJSON = object;
export type AptNftMetadataOpenseaLookupInput = AptNftMetadataOpenseaLookupJSON;

export class AptNftMetadataOpenseaLookup {
  public static create(input: AptNftMetadataOpenseaLookupInput) {
    return new AptNftMetadataOpenseaLookup(input);
  }

  public static fromJSON(json: AptNftMetadataOpenseaLookupJSON) {
    return new AptNftMetadataOpenseaLookup(json);
  }

  public constructor(public readonly value: AptNftMetadataOpenseaLookupInput) {}

  public toJSON(): AptNftMetadataOpenseaLookupJSON {
    return this.value;
  }
}
