import { AptNormalizedMetadata, AptNormalizedMetadataJSON } from '../types/AptNormalizedMetadata';

// $ref: #/components/schemas/nft

export interface AptNftJSON {
  readonly token_address: string;
  readonly token_id: string;
  readonly owner_of?: string;
  readonly token_hash?: string;
  readonly block_number?: string;
  readonly block_number_minted?: string;
  readonly contract_type: string;
  readonly token_uri?: string;
  readonly metadata?: string;
  readonly normalized_metadata?: AptNormalizedMetadataJSON;
  readonly minter_address?: string;
  readonly last_token_uri_sync?: string;
  readonly last_metadata_sync?: string;
  readonly amount?: string;
  readonly name: string;
  readonly symbol: string;
}

export interface AptNftInput {
  readonly tokenAddress: string;
  readonly tokenId: string;
  readonly ownerOf?: string;
  readonly tokenHash?: string;
  readonly blockNumber?: string;
  readonly blockNumberMinted?: string;
  readonly contractType: string;
  readonly tokenUri?: string;
  readonly metadata?: string;
  readonly normalizedMetadata?: AptNormalizedMetadata;
  readonly minterAddress?: string;
  readonly lastTokenUriSync?: string;
  readonly lastMetadataSync?: string;
  readonly amount?: string;
  readonly name: string;
  readonly symbol: string;
}

export class AptNft {
  public static create(input: AptNftInput): AptNft {
    return new AptNft(input);
  }

  public static fromJSON(json: AptNftJSON): AptNft {
    const input: AptNftInput = {
      tokenAddress: json.token_address,
      tokenId: json.token_id,
      ownerOf: json.owner_of,
      tokenHash: json.token_hash,
      blockNumber: json.block_number,
      blockNumberMinted: json.block_number_minted,
      contractType: json.contract_type,
      tokenUri: json.token_uri,
      metadata: json.metadata,
      normalizedMetadata: json.normalized_metadata ? AptNormalizedMetadata.fromJSON(json.normalized_metadata) : undefined,
      minterAddress: json.minter_address,
      lastTokenUriSync: json.last_token_uri_sync,
      lastMetadataSync: json.last_metadata_sync,
      amount: json.amount,
      name: json.name,
      symbol: json.symbol,
    };
    return AptNft.create(input);
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
   * @description The wallet address of the owner of the NFT
   */
  public readonly ownerOf?: string;
  /**
   * @description The token hash
   */
  public readonly tokenHash?: string;
  /**
   * @description The block number when the amount or owner changed
   */
  public readonly blockNumber?: string;
  /**
   * @description The block number when the NFT was minted
   */
  public readonly blockNumberMinted?: string;
  /**
   * @description The type of NFT contract standard
   */
  public readonly contractType: string;
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
   * @description The address that minted the NFT
   */
  public readonly minterAddress?: string;
  /**
   * @description When the token_uri was last updated
   */
  public readonly lastTokenUriSync?: string;
  /**
   * @description When the metadata was last updated
   */
  public readonly lastMetadataSync?: string;
  /**
   * @description The quantity of this item that the user owns (used by ERC1155)
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

  private constructor(input: AptNftInput) {
    this.tokenAddress = input.tokenAddress;
    this.tokenId = input.tokenId;
    this.ownerOf = input.ownerOf;
    this.tokenHash = input.tokenHash;
    this.blockNumber = input.blockNumber;
    this.blockNumberMinted = input.blockNumberMinted;
    this.contractType = input.contractType;
    this.tokenUri = input.tokenUri;
    this.metadata = input.metadata;
    this.normalizedMetadata = input.normalizedMetadata;
    this.minterAddress = input.minterAddress;
    this.lastTokenUriSync = input.lastTokenUriSync;
    this.lastMetadataSync = input.lastMetadataSync;
    this.amount = input.amount;
    this.name = input.name;
    this.symbol = input.symbol;
  }

  public toJSON(): AptNftJSON {
    return {
      token_address: this.tokenAddress,
      token_id: this.tokenId,
      owner_of: this.ownerOf,
      token_hash: this.tokenHash,
      block_number: this.blockNumber,
      block_number_minted: this.blockNumberMinted,
      contract_type: this.contractType,
      token_uri: this.tokenUri,
      metadata: this.metadata,
      normalized_metadata: this.normalizedMetadata ? this.normalizedMetadata.toJSON() : undefined,
      minter_address: this.minterAddress,
      last_token_uri_sync: this.lastTokenUriSync,
      last_metadata_sync: this.lastMetadataSync,
      amount: this.amount,
      name: this.name,
      symbol: this.symbol,
    }
  }
}
