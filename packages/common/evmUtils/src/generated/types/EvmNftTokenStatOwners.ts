// $ref: #/components/schemas/nftTokenStat/properties/owners
// type: nftTokenStat_owners
// properties:
// - current ($ref: #/components/schemas/nftTokenStat/properties/owners/properties/current)

export interface EvmNftTokenStatOwnersJSON {
  readonly current: string;
}

export interface EvmNftTokenStatOwnersInput {
  readonly current: string;
}

export class EvmNftTokenStatOwners {
  public static create(input: EvmNftTokenStatOwnersInput | EvmNftTokenStatOwners): EvmNftTokenStatOwners {
    if (input instanceof EvmNftTokenStatOwners) {
      return input;
    }
    return new EvmNftTokenStatOwners(input);
  }

  public static fromJSON(json: EvmNftTokenStatOwnersJSON): EvmNftTokenStatOwners {
    const input: EvmNftTokenStatOwnersInput = {
      current: json.current,
    };
    return EvmNftTokenStatOwners.create(input);
  }

  /**
   * @description The number of current owners of the nft token
   */
  public readonly current: string;

  private constructor(input: EvmNftTokenStatOwnersInput) {
    this.current = input.current;
  }

  public toJSON(): EvmNftTokenStatOwnersJSON {
    return {
      current: this.current,
    }
  }
}
