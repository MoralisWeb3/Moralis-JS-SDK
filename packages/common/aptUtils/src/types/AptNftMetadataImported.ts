// $ref: #/components/schemas/nftMetadata/properties/imported

export type AptNftMetadataImportedJSON = object;
export type AptNftMetadataImportedInput = AptNftMetadataImportedJSON;

export class AptNftMetadataImported {
  public static create(input: AptNftMetadataImportedInput) {
    return new AptNftMetadataImported(input);
  }

  public static fromJSON(json: AptNftMetadataImportedJSON) {
    return new AptNftMetadataImported(json);
  }

  public constructor(public readonly value: AptNftMetadataImportedInput) {}

  public toJSON(): AptNftMetadataImportedJSON {
    return this.value;
  }
}
