// $ref: #/components/schemas/nftMetadata/properties/frozen_log_index

export type AptNftMetadataFrozenLogIndexJSON = object;
export type AptNftMetadataFrozenLogIndexInput = AptNftMetadataFrozenLogIndexJSON;

export class AptNftMetadataFrozenLogIndex {
  public static create(input: AptNftMetadataFrozenLogIndexInput) {
    return new AptNftMetadataFrozenLogIndex(input);
  }

  public static fromJSON(json: AptNftMetadataFrozenLogIndexJSON) {
    return new AptNftMetadataFrozenLogIndex(json);
  }

  public constructor(public readonly value: AptNftMetadataFrozenLogIndexInput) {}

  public toJSON(): AptNftMetadataFrozenLogIndexJSON {
    return this.value;
  }
}
