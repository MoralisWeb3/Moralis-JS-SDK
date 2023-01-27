import { AptNormalizedMetadata, AptNormalizedMetadataJSON } from '../types/AptNormalizedMetadata';

// $ref: #/components/schemas/nftOwner

export interface AptNftOwnerJSON {
  readonly token_address: string;
  readonly token_id: string;
  readonly contract_type: string;
  readonly owner_of: string;
  readonly block_number: string;
  readonly block_number_minted: string;
  readonly token_uri?: string;
  readonly metadata?: string;
  readonly normalized_metadata?: AptNormalizedMetadataJSON;
  readonly amount?: string;
  readonly name: string;
  readonly symbol: string;
  readonly token_hash: string;
  readonly last_token_uri_sync: string;
  readonly last_metadata_sync: string;
}

export interface AptNftOwnerInput {
  readonly tokenAddress: string;
  readonly tokenId: string;
  readonly contractType: string;
  readonly ownerOf: string;
  readonly blockNumber: string;
  readonly blockNumberMinted: string;
  readonly tokenUri?: string;
  readonly metadata?: string;
  readonly normalizedMetadata?: AptNormalizedMetadata;
  readonly amount?: string;
  readonly name: string;
  readonly symbol: string;
  readonly tokenHash: string;
  readonly lastTokenUriSync: string;
  readonly lastMetadataSync: string;
}

export class AptNftOwner {
  public static create(input: AptNftOwnerInput): AptNftOwner {
    return new AptNftOwner(input);
  }

  public static fromJSON(json: AptNftOwnerJSON): AptNftOwner {
    const input: AptNftOwnerInput = {
      tokenAddress: json.token_address,
      tokenId: json.token_id,
      contractType: json.contract_type,
      ownerOf: json.owner_of,
      blockNumber: json.block_number,
      blockNumberMinted: json.block_number_minted,
      tokenUri: json.token_uri,
      metadata: json.metadata,
      normalizedMetadata: json.normalized_metadata
        ? AptNormalizedMetadata.fromJSON(json.normalized_metadata)
        : undefined,
      amount: json.amount,
      name: json.name,
      symbol: json.symbol,
      tokenHash: json.token_hash,
      lastTokenUriSync: json.last_token_uri_sync,
      lastMetadataSync: json.last_metadata_sync,
    };
    return AptNftOwner.create(input);
  }

  /**
   * @description The address of the NFT contract
   */
  public readonly tokenAddress: string;
  /**
   * @description The token ID of the NFT
   */
  public readonly tokenId: string;
  /**
   * @description The type of NFT contract standard
   */
  public readonly contractType: string;
  /**
   * @description The wallet address of the owner of the NFT
   */
  public readonly ownerOf: string;
  /**
   * @description The block number when the amount or owner changed
   */
  public readonly blockNumber: string;
  /**
   * @description The block number when the NFT was minted
   */
  public readonly blockNumberMinted: string;
  /**
   * @description The URI to the metadata of the token
   */
  public readonly tokenUri?: string;
  /**
   * @description The metadata of the token
   */
  public readonly metadata?: string;
  /**
   * @description A normalized metadata version of the NFT's metadata.
   */
  public readonly normalizedMetadata?: AptNormalizedMetadata;
  /**
   * @description The number of this item the user owns (used by ERC1155)
   */
  public readonly amount?: string;
  /**
   * @description The name of the NFT contract
   */
  public readonly name: string;
  /**
   * @description The symbol of the NFT contract
   */
  public readonly symbol: string;
  /**
   * @description The token hash
   */
  public readonly tokenHash: string;
  /**
   * @description When the token_uri was last updated
   */
  public readonly lastTokenUriSync: string;
  /**
   * @description When the metadata was last updated
   */
  public readonly lastMetadataSync: string;

  private constructor(input: AptNftOwnerInput) {
    this.tokenAddress = input.tokenAddress;
    this.tokenId = input.tokenId;
    this.contractType = input.contractType;
    this.ownerOf = input.ownerOf;
    this.blockNumber = input.blockNumber;
    this.blockNumberMinted = input.blockNumberMinted;
    this.tokenUri = input.tokenUri;
    this.metadata = input.metadata;
    this.normalizedMetadata = input.normalizedMetadata;
    this.amount = input.amount;
    this.name = input.name;
    this.symbol = input.symbol;
    this.tokenHash = input.tokenHash;
    this.lastTokenUriSync = input.lastTokenUriSync;
    this.lastMetadataSync = input.lastMetadataSync;
  }

  public toJSON(): AptNftOwnerJSON {
    return {
      token_address: this.tokenAddress,
      token_id: this.tokenId,
      contract_type: this.contractType,
      owner_of: this.ownerOf,
      block_number: this.blockNumber,
      block_number_minted: this.blockNumberMinted,
      token_uri: this.tokenUri,
      metadata: this.metadata,
      normalized_metadata: this.normalizedMetadata ? this.normalizedMetadata.toJSON() : undefined,
      amount: this.amount,
      name: this.name,
      symbol: this.symbol,
      token_hash: this.tokenHash,
      last_token_uri_sync: this.lastTokenUriSync,
      last_metadata_sync: this.lastMetadataSync,
    };
  }
}
