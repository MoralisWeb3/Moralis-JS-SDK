// $ref: #/components/schemas/nftCollectionStat/properties/owners
// type: nftCollectionStat_owners
// properties:
// - current ($ref: #/components/schemas/nftCollectionStat/properties/owners/properties/current)

export interface EvmNftCollectionStatOwnersJSON {
  readonly current: string;
}

export interface EvmNftCollectionStatOwnersInput {
  readonly current: string;
}

export class EvmNftCollectionStatOwners {
  public static create(input: EvmNftCollectionStatOwnersInput | EvmNftCollectionStatOwners): EvmNftCollectionStatOwners {
    if (input instanceof EvmNftCollectionStatOwners) {
      return input;
    }
    return new EvmNftCollectionStatOwners(input);
  }

  public static fromJSON(json: EvmNftCollectionStatOwnersJSON): EvmNftCollectionStatOwners {
    const input: EvmNftCollectionStatOwnersInput = {
      current: json.current,
    };
    return EvmNftCollectionStatOwners.create(input);
  }

  /**
   * @description The number of current owners of the collection
   */
  public readonly current: string;

  private constructor(input: EvmNftCollectionStatOwnersInput) {
    this.current = input.current;
  }

  public toJSON(): EvmNftCollectionStatOwnersJSON {
    return {
      current: this.current,
    }
  }
}
