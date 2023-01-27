import { AptNftMetadataOpenseaLookup, AptNftMetadataOpenseaLookupJSON } from '../types/AptNftMetadataOpenseaLookup';
import { AptNftMetadataFrozenLogIndex, AptNftMetadataFrozenLogIndexJSON } from '../types/AptNftMetadataFrozenLogIndex';
import { AptNftMetadataImported, AptNftMetadataImportedJSON } from '../types/AptNftMetadataImported';

// $ref: #/components/schemas/nftMetadata

export interface AptNftMetadataJSON {
  readonly token_id: string;
  readonly token_address: string;
  readonly token_uri: string;
  readonly metadata: string;
  readonly is_valid: number;
  readonly syncing: number;
  readonly frozen: number;
  readonly resyncing: number;
  readonly contract_type: string;
  readonly token_hash: string;
  readonly batch_id: string;
  readonly metadata_name: string;
  readonly metadata_description: string;
  readonly metadata_attributes: string;
  readonly block_number_minted: string;
  readonly opensea_lookup?: AptNftMetadataOpenseaLookupJSON;
  readonly minter_address: string;
  readonly transaction_minted: string;
  readonly frozen_log_index?: AptNftMetadataFrozenLogIndexJSON;
  readonly imported?: AptNftMetadataImportedJSON;
  readonly last_token_uri_sync: string;
  readonly last_metadata_sync: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface AptNftMetadataInput {
  readonly tokenId: string;
  readonly tokenAddress: string;
  readonly tokenUri: string;
  readonly metadata: string;
  readonly isValid: number;
  readonly syncing: number;
  readonly frozen: number;
  readonly resyncing: number;
  readonly contractType: string;
  readonly tokenHash: string;
  readonly batchId: string;
  readonly metadataName: string;
  readonly metadataDescription: string;
  readonly metadataAttributes: string;
  readonly blockNumberMinted: string;
  readonly openseaLookup?: AptNftMetadataOpenseaLookup;
  readonly minterAddress: string;
  readonly transactionMinted: string;
  readonly frozenLogIndex?: AptNftMetadataFrozenLogIndex;
  readonly imported?: AptNftMetadataImported;
  readonly lastTokenUriSync: string;
  readonly lastMetadataSync: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class AptNftMetadata {
  public static create(input: AptNftMetadataInput): AptNftMetadata {
    return new AptNftMetadata(input);
  }

  public static fromJSON(json: AptNftMetadataJSON): AptNftMetadata {
    const input: AptNftMetadataInput = {
      tokenId: json.token_id,
      tokenAddress: json.token_address,
      tokenUri: json.token_uri,
      metadata: json.metadata,
      isValid: json.is_valid,
      syncing: json.syncing,
      frozen: json.frozen,
      resyncing: json.resyncing,
      contractType: json.contract_type,
      tokenHash: json.token_hash,
      batchId: json.batch_id,
      metadataName: json.metadata_name,
      metadataDescription: json.metadata_description,
      metadataAttributes: json.metadata_attributes,
      blockNumberMinted: json.block_number_minted,
      openseaLookup: json.opensea_lookup ? AptNftMetadataOpenseaLookup.fromJSON(json.opensea_lookup) : undefined,
      minterAddress: json.minter_address,
      transactionMinted: json.transaction_minted,
      frozenLogIndex: json.frozen_log_index ? AptNftMetadataFrozenLogIndex.fromJSON(json.frozen_log_index) : undefined,
      imported: json.imported ? AptNftMetadataImported.fromJSON(json.imported) : undefined,
      lastTokenUriSync: json.last_token_uri_sync,
      lastMetadataSync: json.last_metadata_sync,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    };
    return AptNftMetadata.create(input);
  }

  /**
   * @description The token ID of the NFT
   */
  public readonly tokenId: string;
  /**
   * @description The address of the NFT contract
   */
  public readonly tokenAddress: string;
  /**
   * @description The URI to the metadata of the token
   */
  public readonly tokenUri: string;
  /**
   * @description The metadata of the token
   */
  public readonly metadata: string;
  public readonly isValid: number;
  public readonly syncing: number;
  public readonly frozen: number;
  public readonly resyncing: number;
  /**
   * @description The type of NFT contract standard
   */
  public readonly contractType: string;
  public readonly tokenHash: string;
  public readonly batchId: string;
  public readonly metadataName: string;
  public readonly metadataDescription: string;
  public readonly metadataAttributes: string;
  public readonly blockNumberMinted: string;
  public readonly openseaLookup?: AptNftMetadataOpenseaLookup;
  public readonly minterAddress: string;
  public readonly transactionMinted: string;
  public readonly frozenLogIndex?: AptNftMetadataFrozenLogIndex;
  public readonly imported?: AptNftMetadataImported;
  /**
   * @description When the token_uri was last updated
   */
  public readonly lastTokenUriSync: string;
  /**
   * @description When the metadata was last updated
   */
  public readonly lastMetadataSync: string;
  public readonly createdAt: string;
  public readonly updatedAt: string;

  private constructor(input: AptNftMetadataInput) {
    this.tokenId = input.tokenId;
    this.tokenAddress = input.tokenAddress;
    this.tokenUri = input.tokenUri;
    this.metadata = input.metadata;
    this.isValid = input.isValid;
    this.syncing = input.syncing;
    this.frozen = input.frozen;
    this.resyncing = input.resyncing;
    this.contractType = input.contractType;
    this.tokenHash = input.tokenHash;
    this.batchId = input.batchId;
    this.metadataName = input.metadataName;
    this.metadataDescription = input.metadataDescription;
    this.metadataAttributes = input.metadataAttributes;
    this.blockNumberMinted = input.blockNumberMinted;
    this.openseaLookup = input.openseaLookup;
    this.minterAddress = input.minterAddress;
    this.transactionMinted = input.transactionMinted;
    this.frozenLogIndex = input.frozenLogIndex;
    this.imported = input.imported;
    this.lastTokenUriSync = input.lastTokenUriSync;
    this.lastMetadataSync = input.lastMetadataSync;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }

  public toJSON(): AptNftMetadataJSON {
    return {
      token_id: this.tokenId,
      token_address: this.tokenAddress,
      token_uri: this.tokenUri,
      metadata: this.metadata,
      is_valid: this.isValid,
      syncing: this.syncing,
      frozen: this.frozen,
      resyncing: this.resyncing,
      contract_type: this.contractType,
      token_hash: this.tokenHash,
      batch_id: this.batchId,
      metadata_name: this.metadataName,
      metadata_description: this.metadataDescription,
      metadata_attributes: this.metadataAttributes,
      block_number_minted: this.blockNumberMinted,
      opensea_lookup: this.openseaLookup ? this.openseaLookup.toJSON() : undefined,
      minter_address: this.minterAddress,
      transaction_minted: this.transactionMinted,
      frozen_log_index: this.frozenLogIndex ? this.frozenLogIndex.toJSON() : undefined,
      imported: this.imported ? this.imported.toJSON() : undefined,
      last_token_uri_sync: this.lastTokenUriSync,
      last_metadata_sync: this.lastMetadataSync,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
