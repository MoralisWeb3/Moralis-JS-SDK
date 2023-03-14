import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosNFTTokenResponseDefaultProperties, AptosNFTTokenResponseDefaultPropertiesValue, AptosNFTTokenResponseDefaultPropertiesInput, AptosNFTTokenResponseDefaultPropertiesJSON } from '../types/AptosNFTTokenResponseDefaultProperties';

// $ref: #/components/schemas/NFTTokenResponse
// type: NFTTokenResponse
// properties:
// - collection_data_id_hash ($ref: #/components/schemas/NFTTokenResponse/properties/collection_data_id_hash)
// - collection_name ($ref: #/components/schemas/NFTTokenResponse/properties/collection_name)
// - creator_address ($ref: #/components/schemas/NFTTokenResponse/properties/creator_address)
// - default_properties ($ref: #/components/schemas/NFTTokenResponse/properties/default_properties)
// - description ($ref: #/components/schemas/NFTTokenResponse/properties/description)
// - description_mutable ($ref: #/components/schemas/NFTTokenResponse/properties/description_mutable)
// - largest_property_version ($ref: #/components/schemas/NFTTokenResponse/properties/largest_property_version)
// - last_transaction_timestamp ($ref: #/components/schemas/NFTTokenResponse/properties/last_transaction_timestamp)
// - last_transaction_version ($ref: #/components/schemas/NFTTokenResponse/properties/last_transaction_version)
// - maximum ($ref: #/components/schemas/NFTTokenResponse/properties/maximum)
// - maximum_mutable ($ref: #/components/schemas/NFTTokenResponse/properties/maximum_mutable)
// - metadata_uri ($ref: #/components/schemas/NFTTokenResponse/properties/metadata_uri)
// - name ($ref: #/components/schemas/NFTTokenResponse/properties/name)
// - payee_address ($ref: #/components/schemas/NFTTokenResponse/properties/payee_address)
// - properties_mutable ($ref: #/components/schemas/NFTTokenResponse/properties/properties_mutable)
// - royalty_mutable ($ref: #/components/schemas/NFTTokenResponse/properties/royalty_mutable)
// - royalty_points_denominator ($ref: #/components/schemas/NFTTokenResponse/properties/royalty_points_denominator)
// - royalty_points_numerator ($ref: #/components/schemas/NFTTokenResponse/properties/royalty_points_numerator)
// - supply ($ref: #/components/schemas/NFTTokenResponse/properties/supply)
// - token_data_id_hash ($ref: #/components/schemas/NFTTokenResponse/properties/token_data_id_hash)
// - uri_mutable ($ref: #/components/schemas/NFTTokenResponse/properties/uri_mutable)

export interface AptosNFTTokenResponseJSON {
  readonly collection_data_id_hash: string;
  readonly collection_name: string;
  readonly creator_address: AptosAddressJSON;
  readonly default_properties: AptosNFTTokenResponseDefaultPropertiesJSON;
  readonly description: string;
  readonly description_mutable: boolean;
  readonly largest_property_version: string;
  readonly last_transaction_timestamp: string;
  readonly last_transaction_version: string;
  readonly maximum: string;
  readonly maximum_mutable: boolean;
  readonly metadata_uri: string;
  readonly name: string;
  readonly payee_address: AptosAddressJSON;
  readonly properties_mutable: boolean;
  readonly royalty_mutable: boolean;
  readonly royalty_points_denominator: string;
  readonly royalty_points_numerator: string;
  readonly supply: string;
  readonly token_data_id_hash: string;
  readonly uri_mutable: boolean;
}

export interface AptosNFTTokenResponseInput {
  readonly collectionDataIdHash: string;
  readonly collectionName: string;
  readonly creatorAddress: AptosAddressInput | AptosAddress;
  readonly defaultProperties: AptosNFTTokenResponseDefaultPropertiesInput | AptosNFTTokenResponseDefaultPropertiesValue;
  readonly description: string;
  readonly descriptionMutable: boolean;
  readonly largestPropertyVersion: string;
  readonly lastTransactionTimestamp: string;
  readonly lastTransactionVersion: string;
  readonly maximum: string;
  readonly maximumMutable: boolean;
  readonly metadataUri: string;
  readonly name: string;
  readonly payeeAddress: AptosAddressInput | AptosAddress;
  readonly propertiesMutable: boolean;
  readonly royaltyMutable: boolean;
  readonly royaltyPointsDenominator: string;
  readonly royaltyPointsNumerator: string;
  readonly supply: string;
  readonly tokenDataIdHash: string;
  readonly uriMutable: boolean;
}

export class AptosNFTTokenResponse {
  public static create(input: AptosNFTTokenResponseInput | AptosNFTTokenResponse): AptosNFTTokenResponse {
    if (input instanceof AptosNFTTokenResponse) {
      return input;
    }
    return new AptosNFTTokenResponse(input);
  }

  public static fromJSON(json: AptosNFTTokenResponseJSON): AptosNFTTokenResponse {
    const input: AptosNFTTokenResponseInput = {
      collectionDataIdHash: json.collection_data_id_hash,
      collectionName: json.collection_name,
      creatorAddress: AptosAddress.fromJSON(json.creator_address),
      defaultProperties: AptosNFTTokenResponseDefaultProperties.fromJSON(json.default_properties),
      description: json.description,
      descriptionMutable: json.description_mutable,
      largestPropertyVersion: json.largest_property_version,
      lastTransactionTimestamp: json.last_transaction_timestamp,
      lastTransactionVersion: json.last_transaction_version,
      maximum: json.maximum,
      maximumMutable: json.maximum_mutable,
      metadataUri: json.metadata_uri,
      name: json.name,
      payeeAddress: AptosAddress.fromJSON(json.payee_address),
      propertiesMutable: json.properties_mutable,
      royaltyMutable: json.royalty_mutable,
      royaltyPointsDenominator: json.royalty_points_denominator,
      royaltyPointsNumerator: json.royalty_points_numerator,
      supply: json.supply,
      tokenDataIdHash: json.token_data_id_hash,
      uriMutable: json.uri_mutable,
    };
    return AptosNFTTokenResponse.create(input);
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
   * @description The default properties of the token
   */
  public readonly defaultProperties: AptosNFTTokenResponseDefaultPropertiesValue;
  /**
   * @description The description of the collection
   */
  public readonly description: string;
  /**
   * @description Whether the description can be changed
   */
  public readonly descriptionMutable: boolean;
  /**
   * @description largest_property_version
   */
  public readonly largestPropertyVersion: string;
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
   * @description The URI of the image of the token
   */
  public readonly metadataUri: string;
  /**
   * @description The name of the token
   */
  public readonly name: string;
  /**
   * @description The address that last payed for the token
   */
  public readonly payeeAddress: AptosAddress;
  /**
   * @description Whether the properties of the token can be changed
   */
  public readonly propertiesMutable: boolean;
  /**
   * @description Whether the royalty of the token can be changed
   */
  public readonly royaltyMutable: boolean;
  /**
   * @description The denominator for royalty points
   */
  public readonly royaltyPointsDenominator: string;
  /**
   * @description The numerator for royalty points
   */
  public readonly royaltyPointsNumerator: string;
  /**
   * @description The number of tokens minted
   */
  public readonly supply: string;
  /**
   * @description The identifier of the token
   */
  public readonly tokenDataIdHash: string;
  /**
   * @description Whether the URI of the image can be changed
   */
  public readonly uriMutable: boolean;

  private constructor(input: AptosNFTTokenResponseInput) {
    this.collectionDataIdHash = input.collectionDataIdHash;
    this.collectionName = input.collectionName;
    this.creatorAddress = AptosAddress.create(input.creatorAddress);
    this.defaultProperties = AptosNFTTokenResponseDefaultProperties.create(input.defaultProperties);
    this.description = input.description;
    this.descriptionMutable = input.descriptionMutable;
    this.largestPropertyVersion = input.largestPropertyVersion;
    this.lastTransactionTimestamp = input.lastTransactionTimestamp;
    this.lastTransactionVersion = input.lastTransactionVersion;
    this.maximum = input.maximum;
    this.maximumMutable = input.maximumMutable;
    this.metadataUri = input.metadataUri;
    this.name = input.name;
    this.payeeAddress = AptosAddress.create(input.payeeAddress);
    this.propertiesMutable = input.propertiesMutable;
    this.royaltyMutable = input.royaltyMutable;
    this.royaltyPointsDenominator = input.royaltyPointsDenominator;
    this.royaltyPointsNumerator = input.royaltyPointsNumerator;
    this.supply = input.supply;
    this.tokenDataIdHash = input.tokenDataIdHash;
    this.uriMutable = input.uriMutable;
  }

  public toJSON(): AptosNFTTokenResponseJSON {
    return {
      collection_data_id_hash: this.collectionDataIdHash,
      collection_name: this.collectionName,
      creator_address: this.creatorAddress.toJSON(),
      default_properties: this.defaultProperties,
      description: this.description,
      description_mutable: this.descriptionMutable,
      largest_property_version: this.largestPropertyVersion,
      last_transaction_timestamp: this.lastTransactionTimestamp,
      last_transaction_version: this.lastTransactionVersion,
      maximum: this.maximum,
      maximum_mutable: this.maximumMutable,
      metadata_uri: this.metadataUri,
      name: this.name,
      payee_address: this.payeeAddress.toJSON(),
      properties_mutable: this.propertiesMutable,
      royalty_mutable: this.royaltyMutable,
      royalty_points_denominator: this.royaltyPointsDenominator,
      royalty_points_numerator: this.royaltyPointsNumerator,
      supply: this.supply,
      token_data_id_hash: this.tokenDataIdHash,
      uri_mutable: this.uriMutable,
    }
  }
}
