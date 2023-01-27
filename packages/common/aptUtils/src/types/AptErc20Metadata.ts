
// $ref: #/components/schemas/erc20Metadata

export interface AptErc20MetadataJSON {
  readonly address: string;
  readonly name: string;
  readonly symbol: string;
  readonly decimals: string;
  readonly logo?: string;
  readonly logo_hash?: string;
  readonly thumbnail?: string;
  readonly block_number?: string;
  readonly validated?: string;
}

export interface AptErc20MetadataInput {
  readonly address: string;
  readonly name: string;
  readonly symbol: string;
  readonly decimals: string;
  readonly logo?: string;
  readonly logoHash?: string;
  readonly thumbnail?: string;
  readonly blockNumber?: string;
  readonly validated?: string;
}

export class AptErc20Metadata {
  public static create(input: AptErc20MetadataInput): AptErc20Metadata {
    return new AptErc20Metadata(input);
  }

  public static fromJSON(json: AptErc20MetadataJSON): AptErc20Metadata {
    const input: AptErc20MetadataInput = {
      address: json.address,
      name: json.name,
      symbol: json.symbol,
      decimals: json.decimals,
      logo: json.logo,
      logoHash: json.logo_hash,
      thumbnail: json.thumbnail,
      blockNumber: json.block_number,
      validated: json.validated,
    };
    return AptErc20Metadata.create(input);
  }

  /**
   * @description The address of the token contract
   */
  public readonly address: string;
  /**
   * @description The name of the token contract
   */
  public readonly name: string;
  /**
   * @description The symbol of the NFT contract
   */
  public readonly symbol: string;
  /**
   * @description The number of decimals on the token
   */
  public readonly decimals: string;
  /**
   * @description The logo of the token
   */
  public readonly logo?: string;
  /**
   * @description The logo hash
   */
  public readonly logoHash?: string;
  /**
   * @description The thumbnail of the logo
   */
  public readonly thumbnail?: string;
  public readonly blockNumber?: string;
  public readonly validated?: string;

  private constructor(input: AptErc20MetadataInput) {
    this.address = input.address;
    this.name = input.name;
    this.symbol = input.symbol;
    this.decimals = input.decimals;
    this.logo = input.logo;
    this.logoHash = input.logoHash;
    this.thumbnail = input.thumbnail;
    this.blockNumber = input.blockNumber;
    this.validated = input.validated;
  }

  public toJSON(): AptErc20MetadataJSON {
    return {
      address: this.address,
      name: this.name,
      symbol: this.symbol,
      decimals: this.decimals,
      logo: this.logo,
      logo_hash: this.logoHash,
      thumbnail: this.thumbnail,
      block_number: this.blockNumber,
      validated: this.validated,
    }
  }
}
