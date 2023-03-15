import { AptosNative, AptosNativeInput, AptosNativeJSON, AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosNFTOwnerResponseTokenProperties, AptosNFTOwnerResponseTokenPropertiesValue, AptosNFTOwnerResponseTokenPropertiesInput, AptosNFTOwnerResponseTokenPropertiesJSON } from '../types/AptosNFTOwnerResponseTokenProperties';

// $ref: #/components/schemas/NFTOwnerResponse
// type: NFTOwnerResponse
// properties:
// - amount ($ref: #/components/schemas/NFTOwnerResponse/properties/amount)
// - collection_data_id_hash ($ref: #/components/schemas/NFTOwnerResponse/properties/collection_data_id_hash)
// - collection_name ($ref: #/components/schemas/NFTOwnerResponse/properties/collection_name)
// - creator_address ($ref: #/components/schemas/NFTOwnerResponse/properties/creator_address)
// - last_transaction_timestamp ($ref: #/components/schemas/NFTOwnerResponse/properties/last_transaction_timestamp)
// - last_transaction_version ($ref: #/components/schemas/NFTOwnerResponse/properties/last_transaction_version)
// - name ($ref: #/components/schemas/NFTOwnerResponse/properties/name)
// - owner_address ($ref: #/components/schemas/NFTOwnerResponse/properties/owner_address)
// - property_version ($ref: #/components/schemas/NFTOwnerResponse/properties/property_version)
// - table_type ($ref: #/components/schemas/NFTOwnerResponse/properties/table_type)
// - token_data_id_hash ($ref: #/components/schemas/NFTOwnerResponse/properties/token_data_id_hash)
// - token_properties ($ref: #/components/schemas/NFTOwnerResponse/properties/token_properties)

export interface AptosNFTOwnerResponseJSON {
  readonly amount: AptosNativeJSON;
  readonly collection_data_id_hash: string;
  readonly collection_name: string;
  readonly creator_address: AptosAddressJSON;
  readonly last_transaction_timestamp: string;
  readonly last_transaction_version: string;
  readonly name: string;
  readonly owner_address: AptosAddressJSON;
  readonly property_version: string;
  readonly table_type: string;
  readonly token_data_id_hash: string;
  readonly token_properties: AptosNFTOwnerResponseTokenPropertiesJSON;
}

export interface AptosNFTOwnerResponseInput {
  readonly amount: AptosNativeInput | AptosNative;
  readonly collectionDataIdHash: string;
  readonly collectionName: string;
  readonly creatorAddress: AptosAddressInput | AptosAddress;
  readonly lastTransactionTimestamp: string;
  readonly lastTransactionVersion: string;
  readonly name: string;
  readonly ownerAddress: AptosAddressInput | AptosAddress;
  readonly propertyVersion: string;
  readonly tableType: string;
  readonly tokenDataIdHash: string;
  readonly tokenProperties: AptosNFTOwnerResponseTokenPropertiesInput | AptosNFTOwnerResponseTokenPropertiesValue;
}

export class AptosNFTOwnerResponse {
  public static create(input: AptosNFTOwnerResponseInput | AptosNFTOwnerResponse): AptosNFTOwnerResponse {
    if (input instanceof AptosNFTOwnerResponse) {
      return input;
    }
    return new AptosNFTOwnerResponse(input);
  }

  public static fromJSON(json: AptosNFTOwnerResponseJSON): AptosNFTOwnerResponse {
    const input: AptosNFTOwnerResponseInput = {
      amount: AptosNative.fromJSON(json.amount),
      collectionDataIdHash: json.collection_data_id_hash,
      collectionName: json.collection_name,
      creatorAddress: AptosAddress.fromJSON(json.creator_address),
      lastTransactionTimestamp: json.last_transaction_timestamp,
      lastTransactionVersion: json.last_transaction_version,
      name: json.name,
      ownerAddress: AptosAddress.fromJSON(json.owner_address),
      propertyVersion: json.property_version,
      tableType: json.table_type,
      tokenDataIdHash: json.token_data_id_hash,
      tokenProperties: AptosNFTOwnerResponseTokenProperties.fromJSON(json.token_properties),
    };
    return AptosNFTOwnerResponse.create(input);
  }

  /**
   * @description The number of tokens that belonging to the owner
   */
  public readonly amount: AptosNative;
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
   * @description The timestamp of the last transaction
   */
  public readonly lastTransactionTimestamp: string;
  /**
   * @description The version of the last transaction
   */
  public readonly lastTransactionVersion: string;
  /**
   * @description The name of the token
   */
  public readonly name: string;
  /**
   * @description The address of the owner of the token
   */
  public readonly ownerAddress: AptosAddress;
  /**
   * @description The property version of the token
   */
  public readonly propertyVersion: string;
  /**
   * @description The data structure of the token
   */
  public readonly tableType: string;
  /**
   * @description The identifier of the token
   */
  public readonly tokenDataIdHash: string;
  /**
   * @description The properties of the token
   */
  public readonly tokenProperties: AptosNFTOwnerResponseTokenPropertiesValue;

  private constructor(input: AptosNFTOwnerResponseInput) {
    this.amount = AptosNative.create(input.amount);
    this.collectionDataIdHash = input.collectionDataIdHash;
    this.collectionName = input.collectionName;
    this.creatorAddress = AptosAddress.create(input.creatorAddress);
    this.lastTransactionTimestamp = input.lastTransactionTimestamp;
    this.lastTransactionVersion = input.lastTransactionVersion;
    this.name = input.name;
    this.ownerAddress = AptosAddress.create(input.ownerAddress);
    this.propertyVersion = input.propertyVersion;
    this.tableType = input.tableType;
    this.tokenDataIdHash = input.tokenDataIdHash;
    this.tokenProperties = AptosNFTOwnerResponseTokenProperties.create(input.tokenProperties);
  }

  public toJSON(): AptosNFTOwnerResponseJSON {
    return {
      amount: this.amount.toJSON(),
      collection_data_id_hash: this.collectionDataIdHash,
      collection_name: this.collectionName,
      creator_address: this.creatorAddress.toJSON(),
      last_transaction_timestamp: this.lastTransactionTimestamp,
      last_transaction_version: this.lastTransactionVersion,
      name: this.name,
      owner_address: this.ownerAddress.toJSON(),
      property_version: this.propertyVersion,
      table_type: this.tableType,
      token_data_id_hash: this.tokenDataIdHash,
      token_properties: this.tokenProperties,
    }
  }
}
