
// $ref: #/components/schemas/nftContractMetadata

export interface AptNftContractMetadataJSON {
  readonly token_address: string;
  readonly name: string;
  readonly synced_at?: string;
  readonly symbol: string;
  readonly contract_type: string;
}

export interface AptNftContractMetadataInput {
  readonly tokenAddress: string;
  readonly name: string;
  readonly syncedAt?: string;
  readonly symbol: string;
  readonly contractType: string;
}

export class AptNftContractMetadata {
  public static create(input: AptNftContractMetadataInput): AptNftContractMetadata {
    return new AptNftContractMetadata(input);
  }

  public static fromJSON(json: AptNftContractMetadataJSON): AptNftContractMetadata {
    const input: AptNftContractMetadataInput = {
      tokenAddress: json.token_address,
      name: json.name,
      syncedAt: json.synced_at,
      symbol: json.symbol,
      contractType: json.contract_type,
    };
    return AptNftContractMetadata.create(input);
  }

  /**
   * @description The address of the token contract
   */
  public readonly tokenAddress: string;
  /**
   * @description The name of the token contract
   */
  public readonly name: string;
  /**
   * @description Timestamp of when the contract was last synced with the node
   */
  public readonly syncedAt?: string;
  /**
   * @description The symbol of the NFT contract
   */
  public readonly symbol: string;
  /**
   * @description The type of NFT contract
   */
  public readonly contractType: string;

  private constructor(input: AptNftContractMetadataInput) {
    this.tokenAddress = input.tokenAddress;
    this.name = input.name;
    this.syncedAt = input.syncedAt;
    this.symbol = input.symbol;
    this.contractType = input.contractType;
  }

  public toJSON(): AptNftContractMetadataJSON {
    return {
      token_address: this.tokenAddress,
      name: this.name,
      synced_at: this.syncedAt,
      symbol: this.symbol,
      contract_type: this.contractType,
    }
  }
}
