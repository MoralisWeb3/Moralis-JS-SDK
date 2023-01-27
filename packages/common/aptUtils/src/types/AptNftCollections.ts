// $ref: #/components/schemas/nftCollections

export interface AptNftCollectionsJSON {
  readonly token_address: string;
  readonly contract_type: string;
  readonly name: string;
  readonly symbol: string;
}

export interface AptNftCollectionsInput {
  readonly tokenAddress: string;
  readonly contractType: string;
  readonly name: string;
  readonly symbol: string;
}

export class AptNftCollections {
  public static create(input: AptNftCollectionsInput): AptNftCollections {
    return new AptNftCollections(input);
  }

  public static fromJSON(json: AptNftCollectionsJSON): AptNftCollections {
    const input: AptNftCollectionsInput = {
      tokenAddress: json.token_address,
      contractType: json.contract_type,
      name: json.name,
      symbol: json.symbol,
    };
    return AptNftCollections.create(input);
  }

  /**
   * @description The address of the NFT contract
   */
  public readonly tokenAddress: string;
  /**
   * @description The type of NFT contract standard
   */
  public readonly contractType: string;
  /**
   * @description The name of the NFT contract
   */
  public readonly name: string;
  /**
   * @description The symbol of the NFT contract
   */
  public readonly symbol: string;

  private constructor(input: AptNftCollectionsInput) {
    this.tokenAddress = input.tokenAddress;
    this.contractType = input.contractType;
    this.name = input.name;
    this.symbol = input.symbol;
  }

  public toJSON(): AptNftCollectionsJSON {
    return {
      token_address: this.tokenAddress,
      contract_type: this.contractType,
      name: this.name,
      symbol: this.symbol,
    };
  }
}
