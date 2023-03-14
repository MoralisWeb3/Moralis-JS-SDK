import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/NFTCollectionItemResponse
// type: NFTCollectionItemResponse
// properties:
// - collection_data_id_hash ($ref: #/components/schemas/NFTCollectionItemResponse/properties/collection_data_id_hash)
// - collection_name ($ref: #/components/schemas/NFTCollectionItemResponse/properties/collection_name)
// - creator_address ($ref: #/components/schemas/NFTCollectionItemResponse/properties/creator_address)
// - description ($ref: #/components/schemas/NFTCollectionItemResponse/properties/description)
// - description_mutable ($ref: #/components/schemas/NFTCollectionItemResponse/properties/description_mutable)
// - last_transaction_timestamp ($ref: #/components/schemas/NFTCollectionItemResponse/properties/last_transaction_timestamp)
// - last_transaction_version ($ref: #/components/schemas/NFTCollectionItemResponse/properties/last_transaction_version)
// - maximum ($ref: #/components/schemas/NFTCollectionItemResponse/properties/maximum)
// - maximum_mutable ($ref: #/components/schemas/NFTCollectionItemResponse/properties/maximum_mutable)
// - metadata_uri ($ref: #/components/schemas/NFTCollectionItemResponse/properties/metadata_uri)
// - supply ($ref: #/components/schemas/NFTCollectionItemResponse/properties/supply)
// - table_handle ($ref: #/components/schemas/NFTCollectionItemResponse/properties/table_handle)
// - uri_mutable ($ref: #/components/schemas/NFTCollectionItemResponse/properties/uri_mutable)

export interface AptosNFTCollectionItemResponseJSON {
  readonly collection_data_id_hash: string;
  readonly collection_name: string;
  readonly creator_address: AptosAddressJSON;
  readonly description: string;
  readonly description_mutable: boolean;
  readonly last_transaction_timestamp: string;
  readonly last_transaction_version: string;
  readonly maximum: string;
  readonly maximum_mutable: boolean;
  readonly metadata_uri: string;
  readonly supply: string;
  readonly table_handle: string;
  readonly uri_mutable: boolean;
}

export interface AptosNFTCollectionItemResponseInput {
  readonly collectionDataIdHash: string;
  readonly collectionName: string;
  readonly creatorAddress: AptosAddressInput | AptosAddress;
  readonly description: string;
  readonly descriptionMutable: boolean;
  readonly lastTransactionTimestamp: string;
  readonly lastTransactionVersion: string;
  readonly maximum: string;
  readonly maximumMutable: boolean;
  readonly metadataUri: string;
  readonly supply: string;
  readonly tableHandle: string;
  readonly uriMutable: boolean;
}

export class AptosNFTCollectionItemResponse {
  public static create(input: AptosNFTCollectionItemResponseInput | AptosNFTCollectionItemResponse): AptosNFTCollectionItemResponse {
    if (input instanceof AptosNFTCollectionItemResponse) {
      return input;
    }
    return new AptosNFTCollectionItemResponse(input);
  }

  public static fromJSON(json: AptosNFTCollectionItemResponseJSON): AptosNFTCollectionItemResponse {
    const input: AptosNFTCollectionItemResponseInput = {
      collectionDataIdHash: json.collection_data_id_hash,
      collectionName: json.collection_name,
      creatorAddress: AptosAddress.fromJSON(json.creator_address),
      description: json.description,
      descriptionMutable: json.description_mutable,
      lastTransactionTimestamp: json.last_transaction_timestamp,
      lastTransactionVersion: json.last_transaction_version,
      maximum: json.maximum,
      maximumMutable: json.maximum_mutable,
      metadataUri: json.metadata_uri,
      supply: json.supply,
      tableHandle: json.table_handle,
      uriMutable: json.uri_mutable,
    };
    return AptosNFTCollectionItemResponse.create(input);
  }

  /**
   * @description The identifier of the collection
   */
  public readonly collectionDataIdHash: string;
  /**
   * @description The name of the collection
   */
  public readonly collectionName: string;
  /**
   * @description The address of the creator of the collection
   */
  public readonly creatorAddress: AptosAddress;
  /**
   * @description The description of the collection
   */
  public readonly description: string;
  /**
   * @description Whether the description can be changed
   */
  public readonly descriptionMutable: boolean;
  /**
   * @description The timestamp of the last transaction
   */
  public readonly lastTransactionTimestamp: string;
  /**
   * @description The version of the last transaction
   */
  public readonly lastTransactionVersion: string;
  /**
   * @description The maximum number of tokens that can be minted
   */
  public readonly maximum: string;
  /**
   * @description Whether the maximum number of tokens can be changed
   */
  public readonly maximumMutable: boolean;
  /**
   * @description The URI of the image of the collection
   */
  public readonly metadataUri: string;
  /**
   * @description The number of tokens minted
   */
  public readonly supply: string;
  /**
   * @description The address of the table that stores the tokens
   */
  public readonly tableHandle: string;
  /**
   * @description Whether the URI of the image can be changed
   */
  public readonly uriMutable: boolean;

  private constructor(input: AptosNFTCollectionItemResponseInput) {
    this.collectionDataIdHash = input.collectionDataIdHash;
    this.collectionName = input.collectionName;
    this.creatorAddress = AptosAddress.create(input.creatorAddress);
    this.description = input.description;
    this.descriptionMutable = input.descriptionMutable;
    this.lastTransactionTimestamp = input.lastTransactionTimestamp;
    this.lastTransactionVersion = input.lastTransactionVersion;
    this.maximum = input.maximum;
    this.maximumMutable = input.maximumMutable;
    this.metadataUri = input.metadataUri;
    this.supply = input.supply;
    this.tableHandle = input.tableHandle;
    this.uriMutable = input.uriMutable;
  }

  public toJSON(): AptosNFTCollectionItemResponseJSON {
    return {
      collection_data_id_hash: this.collectionDataIdHash,
      collection_name: this.collectionName,
      creator_address: this.creatorAddress.toJSON(),
      description: this.description,
      description_mutable: this.descriptionMutable,
      last_transaction_timestamp: this.lastTransactionTimestamp,
      last_transaction_version: this.lastTransactionVersion,
      maximum: this.maximum,
      maximum_mutable: this.maximumMutable,
      metadata_uri: this.metadataUri,
      supply: this.supply,
      table_handle: this.tableHandle,
      uri_mutable: this.uriMutable,
    }
  }
}
