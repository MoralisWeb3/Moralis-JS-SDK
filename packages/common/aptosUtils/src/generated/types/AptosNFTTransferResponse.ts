import { AptosNative, AptosNativeInput, AptosNativeJSON, AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';

// $ref: #/components/schemas/NFTTransferResponse
// type: NFTTransferResponse
// properties:
// - coin_amount ($ref: #/components/schemas/NFTTransferResponse/properties/coin_amount)
// - coin_type ($ref: #/components/schemas/NFTTransferResponse/properties/coin_type)
// - collection_data_id_hash ($ref: #/components/schemas/NFTTransferResponse/properties/collection_data_id_hash)
// - collection_name ($ref: #/components/schemas/NFTTransferResponse/properties/collection_name)
// - creator_address ($ref: #/components/schemas/NFTTransferResponse/properties/creator_address)
// - event_account_address ($ref: #/components/schemas/NFTTransferResponse/properties/event_account_address)
// - event_creation_number ($ref: #/components/schemas/NFTTransferResponse/properties/event_creation_number)
// - event_sequence_number ($ref: #/components/schemas/NFTTransferResponse/properties/event_sequence_number)
// - from_address ($ref: #/components/schemas/NFTTransferResponse/properties/from_address)
// - name ($ref: #/components/schemas/NFTTransferResponse/properties/name)
// - property_version ($ref: #/components/schemas/NFTTransferResponse/properties/property_version)
// - to_address ($ref: #/components/schemas/NFTTransferResponse/properties/to_address)
// - token_amount ($ref: #/components/schemas/NFTTransferResponse/properties/token_amount)
// - token_data_id_hash ($ref: #/components/schemas/NFTTransferResponse/properties/token_data_id_hash)
// - transaction_timestamp ($ref: #/components/schemas/NFTTransferResponse/properties/transaction_timestamp)
// - transaction_version ($ref: #/components/schemas/NFTTransferResponse/properties/transaction_version)
// - transfer_type ($ref: #/components/schemas/NFTTransferResponse/properties/transfer_type)

export interface AptosNFTTransferResponseJSON {
  readonly coin_amount: AptosNativeJSON;
  readonly coin_type: string;
  readonly collection_data_id_hash: string;
  readonly collection_name: string;
  readonly creator_address: AptosAddressJSON;
  readonly event_account_address: string;
  readonly event_creation_number: string;
  readonly event_sequence_number: string;
  readonly from_address: AptosAddressJSON;
  readonly name: string;
  readonly property_version: string;
  readonly to_address: AptosAddressJSON;
  readonly token_amount: AptosNativeJSON;
  readonly token_data_id_hash: string;
  readonly transaction_timestamp: string;
  readonly transaction_version: string;
  readonly transfer_type: string;
}

export interface AptosNFTTransferResponseInput {
  readonly coinAmount: AptosNativeInput | AptosNative;
  readonly coinType: string;
  readonly collectionDataIdHash: string;
  readonly collectionName: string;
  readonly creatorAddress: AptosAddressInput | AptosAddress;
  readonly eventAccountAddress: string;
  readonly eventCreationNumber: string;
  readonly eventSequenceNumber: string;
  readonly fromAddress: AptosAddressInput | AptosAddress;
  readonly name: string;
  readonly propertyVersion: string;
  readonly toAddress: AptosAddressInput | AptosAddress;
  readonly tokenAmount: AptosNativeInput | AptosNative;
  readonly tokenDataIdHash: string;
  readonly transactionTimestamp: string;
  readonly transactionVersion: string;
  readonly transferType: string;
}

export class AptosNFTTransferResponse {
  public static create(input: AptosNFTTransferResponseInput | AptosNFTTransferResponse): AptosNFTTransferResponse {
    if (input instanceof AptosNFTTransferResponse) {
      return input;
    }
    return new AptosNFTTransferResponse(input);
  }

  public static fromJSON(json: AptosNFTTransferResponseJSON): AptosNFTTransferResponse {
    const input: AptosNFTTransferResponseInput = {
      coinAmount: AptosNative.fromJSON(json.coin_amount),
      coinType: json.coin_type,
      collectionDataIdHash: json.collection_data_id_hash,
      collectionName: json.collection_name,
      creatorAddress: AptosAddress.fromJSON(json.creator_address),
      eventAccountAddress: json.event_account_address,
      eventCreationNumber: json.event_creation_number,
      eventSequenceNumber: json.event_sequence_number,
      fromAddress: AptosAddress.fromJSON(json.from_address),
      name: json.name,
      propertyVersion: json.property_version,
      toAddress: AptosAddress.fromJSON(json.to_address),
      tokenAmount: AptosNative.fromJSON(json.token_amount),
      tokenDataIdHash: json.token_data_id_hash,
      transactionTimestamp: json.transaction_timestamp,
      transactionVersion: json.transaction_version,
      transferType: json.transfer_type,
    };
    return AptosNFTTransferResponse.create(input);
  }

  /**
   * @description The number of tokens transferred
   */
  public readonly coinAmount: AptosNative;
  /**
   * @description The type of tokens transferred
   */
  public readonly coinType: string;
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
   * @description The account address of the transfer
   */
  public readonly eventAccountAddress: string;
  /**
   * @description The creation number of the event
   */
  public readonly eventCreationNumber: string;
  /**
   * @description The sequence number of the event
   */
  public readonly eventSequenceNumber: string;
  /**
   * @description The address sending the transfer
   */
  public readonly fromAddress: AptosAddress;
  /**
   * @description The name of the token
   */
  public readonly name: string;
  /**
   * @description The property version of the token
   */
  public readonly propertyVersion: string;
  /**
   * @description The address recieving the transfer
   */
  public readonly toAddress: AptosAddress;
  /**
   * @description The number of tokens transferred
   */
  public readonly tokenAmount: AptosNative;
  /**
   * @description The identifier of the token
   */
  public readonly tokenDataIdHash: string;
  /**
   * @description The timestamp of the transfer
   */
  public readonly transactionTimestamp: string;
  /**
   * @description The version of the transaction that the transfer is a part of
   */
  public readonly transactionVersion: string;
  /**
   * @description The type of transfer
   */
  public readonly transferType: string;

  private constructor(input: AptosNFTTransferResponseInput) {
    this.coinAmount = AptosNative.create(input.coinAmount);
    this.coinType = input.coinType;
    this.collectionDataIdHash = input.collectionDataIdHash;
    this.collectionName = input.collectionName;
    this.creatorAddress = AptosAddress.create(input.creatorAddress);
    this.eventAccountAddress = input.eventAccountAddress;
    this.eventCreationNumber = input.eventCreationNumber;
    this.eventSequenceNumber = input.eventSequenceNumber;
    this.fromAddress = AptosAddress.create(input.fromAddress);
    this.name = input.name;
    this.propertyVersion = input.propertyVersion;
    this.toAddress = AptosAddress.create(input.toAddress);
    this.tokenAmount = AptosNative.create(input.tokenAmount);
    this.tokenDataIdHash = input.tokenDataIdHash;
    this.transactionTimestamp = input.transactionTimestamp;
    this.transactionVersion = input.transactionVersion;
    this.transferType = input.transferType;
  }

  public toJSON(): AptosNFTTransferResponseJSON {
    return {
      coin_amount: this.coinAmount.toJSON(),
      coin_type: this.coinType,
      collection_data_id_hash: this.collectionDataIdHash,
      collection_name: this.collectionName,
      creator_address: this.creatorAddress.toJSON(),
      event_account_address: this.eventAccountAddress,
      event_creation_number: this.eventCreationNumber,
      event_sequence_number: this.eventSequenceNumber,
      from_address: this.fromAddress.toJSON(),
      name: this.name,
      property_version: this.propertyVersion,
      to_address: this.toAddress.toJSON(),
      token_amount: this.tokenAmount.toJSON(),
      token_data_id_hash: this.tokenDataIdHash,
      transaction_timestamp: this.transactionTimestamp,
      transaction_version: this.transactionVersion,
      transfer_type: this.transferType,
    }
  }
}
