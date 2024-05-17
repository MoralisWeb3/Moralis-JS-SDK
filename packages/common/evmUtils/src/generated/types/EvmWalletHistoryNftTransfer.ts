import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { EvmNormalizedMetadata, EvmNormalizedMetadataInput, EvmNormalizedMetadataJSON } from '../types/EvmNormalizedMetadata';

// $ref: #/components/schemas/walletHistoryNftTransfer
// type: walletHistoryNftTransfer
// properties:
// - token_address ($ref: #/components/schemas/walletHistoryNftTransfer/properties/token_address)
// - token_id ($ref: #/components/schemas/walletHistoryNftTransfer/properties/token_id)
// - from_address ($ref: #/components/schemas/walletHistoryNftTransfer/properties/from_address)
// - from_address_label ($ref: #/components/schemas/walletHistoryNftTransfer/properties/from_address_label)
// - to_address ($ref: #/components/schemas/walletHistoryNftTransfer/properties/to_address)
// - to_address_label ($ref: #/components/schemas/walletHistoryNftTransfer/properties/to_address_label)
// - value ($ref: #/components/schemas/walletHistoryNftTransfer/properties/value)
// - amount ($ref: #/components/schemas/walletHistoryNftTransfer/properties/amount)
// - contract_type ($ref: #/components/schemas/walletHistoryNftTransfer/properties/contract_type)
// - transaction_type ($ref: #/components/schemas/walletHistoryNftTransfer/properties/transaction_type)
// - log_index ($ref: #/components/schemas/walletHistoryNftTransfer/properties/log_index)
// - operator ($ref: #/components/schemas/walletHistoryNftTransfer/properties/operator)
// - possible_spam ($ref: #/components/schemas/walletHistoryNftTransfer/properties/possible_spam)
// - verified_collection ($ref: #/components/schemas/walletHistoryNftTransfer/properties/verified_collection)
// - direction ($ref: #/components/schemas/walletHistoryNftTransfer/properties/direction)
// - collection_logo ($ref: #/components/schemas/walletHistoryNftTransfer/properties/collection_logo)
// - collection_banner_image ($ref: #/components/schemas/walletHistoryNftTransfer/properties/collection_banner_image)
// - normalized_metadata ($ref: #/components/schemas/normalizedMetadata)

export interface EvmWalletHistoryNftTransferJSON {
  readonly token_address: EvmAddressJSON;
  readonly token_id: string;
  readonly from_address: EvmAddressJSON;
  readonly from_address_label?: string;
  readonly to_address?: EvmAddressJSON;
  readonly to_address_label?: string;
  readonly value: string;
  readonly amount: string;
  readonly contract_type: string;
  readonly transaction_type: string;
  readonly log_index: number;
  readonly operator?: string;
  readonly possible_spam: boolean;
  readonly verified_collection?: boolean;
  readonly direction: string;
  readonly collection_logo?: string;
  readonly collection_banner_image?: string;
  readonly normalized_metadata?: EvmNormalizedMetadataJSON;
}

export interface EvmWalletHistoryNftTransferInput {
  readonly tokenAddress: EvmAddressInput | EvmAddress;
  readonly tokenId: string;
  readonly fromAddress: EvmAddressInput | EvmAddress;
  readonly fromAddressLabel?: string;
  readonly toAddress?: EvmAddressInput | EvmAddress;
  readonly toAddressLabel?: string;
  readonly value: string;
  readonly amount: string;
  readonly contractType: string;
  readonly transactionType: string;
  readonly logIndex: number;
  readonly operator?: string;
  readonly possibleSpam: boolean;
  readonly verifiedCollection?: boolean;
  readonly direction: string;
  readonly collectionLogo?: string;
  readonly collectionBannerImage?: string;
  readonly normalizedMetadata?: EvmNormalizedMetadataInput | EvmNormalizedMetadata;
}

export class EvmWalletHistoryNftTransfer {
  public static create(input: EvmWalletHistoryNftTransferInput | EvmWalletHistoryNftTransfer): EvmWalletHistoryNftTransfer {
    if (input instanceof EvmWalletHistoryNftTransfer) {
      return input;
    }
    return new EvmWalletHistoryNftTransfer(input);
  }

  public static fromJSON(json: EvmWalletHistoryNftTransferJSON): EvmWalletHistoryNftTransfer {
    const input: EvmWalletHistoryNftTransferInput = {
      tokenAddress: EvmAddress.fromJSON(json.token_address),
      tokenId: json.token_id,
      fromAddress: EvmAddress.fromJSON(json.from_address),
      fromAddressLabel: json.from_address_label,
      toAddress: json.to_address ? EvmAddress.fromJSON(json.to_address) : undefined,
      toAddressLabel: json.to_address_label,
      value: json.value,
      amount: json.amount,
      contractType: json.contract_type,
      transactionType: json.transaction_type,
      logIndex: json.log_index,
      operator: json.operator,
      possibleSpam: json.possible_spam,
      verifiedCollection: json.verified_collection,
      direction: json.direction,
      collectionLogo: json.collection_logo,
      collectionBannerImage: json.collection_banner_image,
      normalizedMetadata: json.normalized_metadata ? EvmNormalizedMetadata.fromJSON(json.normalized_metadata) : undefined,
    };
    return EvmWalletHistoryNftTransfer.create(input);
  }

  /**
   * @description The address of the NFT contract
   */
  public readonly tokenAddress: EvmAddress;
  /**
   * @description The token ID of the NFT
   */
  public readonly tokenId: string;
  /**
   * @description The address that sent the NFT
   */
  public readonly fromAddress: EvmAddress;
  /**
   * @description The label of the from address
   */
  public readonly fromAddressLabel?: string;
  /**
   * @description The address that received the NFT
   */
  public readonly toAddress?: EvmAddress;
  /**
   * @description The label of the to address
   */
  public readonly toAddressLabel?: string;
  /**
   * @description The value that was sent in the transaction (ETH/BNB/etc..)
   */
  public readonly value: string;
  /**
   * @description The number of tokens transferred
   */
  public readonly amount: string;
  /**
   * @description The type of NFT contract standard
   */
  public readonly contractType: string;
  /**
   * @description The transaction type
   */
  public readonly transactionType: string;
  /**
   * @description The log index
   */
  public readonly logIndex: number;
  /**
   * @description The operator present only for ERC1155 transfers
   */
  public readonly operator?: string;
  /**
   * @description Indicates if a contract is possibly a spam contract
   */
  public readonly possibleSpam: boolean;
  /**
   * @description Indicates if a contract is verified
   */
  public readonly verifiedCollection?: boolean;
  /**
   * @description The direction of the transfer
   */
  public readonly direction: string;
  /**
   * @description The logo of the collection
   */
  public readonly collectionLogo?: string;
  /**
   * @description The banner image of the collection
   */
  public readonly collectionBannerImage?: string;
  /**
   * @description A normalized metadata version of the NFT's metadata.
   */
  public readonly normalizedMetadata?: EvmNormalizedMetadata;

  private constructor(input: EvmWalletHistoryNftTransferInput) {
    this.tokenAddress = EvmAddress.create(input.tokenAddress);
    this.tokenId = input.tokenId;
    this.fromAddress = EvmAddress.create(input.fromAddress);
    this.fromAddressLabel = input.fromAddressLabel;
    this.toAddress = input.toAddress ? EvmAddress.create(input.toAddress) : undefined;
    this.toAddressLabel = input.toAddressLabel;
    this.value = input.value;
    this.amount = input.amount;
    this.contractType = input.contractType;
    this.transactionType = input.transactionType;
    this.logIndex = input.logIndex;
    this.operator = input.operator;
    this.possibleSpam = input.possibleSpam;
    this.verifiedCollection = input.verifiedCollection;
    this.direction = input.direction;
    this.collectionLogo = input.collectionLogo;
    this.collectionBannerImage = input.collectionBannerImage;
    this.normalizedMetadata = input.normalizedMetadata ? EvmNormalizedMetadata.create(input.normalizedMetadata) : undefined;
  }

  public toJSON(): EvmWalletHistoryNftTransferJSON {
    return {
      token_address: this.tokenAddress.toJSON(),
      token_id: this.tokenId,
      from_address: this.fromAddress.toJSON(),
      from_address_label: this.fromAddressLabel,
      to_address: this.toAddress ? this.toAddress.toJSON() : undefined,
      to_address_label: this.toAddressLabel,
      value: this.value,
      amount: this.amount,
      contract_type: this.contractType,
      transaction_type: this.transactionType,
      log_index: this.logIndex,
      operator: this.operator,
      possible_spam: this.possibleSpam,
      verified_collection: this.verifiedCollection,
      direction: this.direction,
      collection_logo: this.collectionLogo,
      collection_banner_image: this.collectionBannerImage,
      normalized_metadata: this.normalizedMetadata ? this.normalizedMetadata.toJSON() : undefined,
    }
  }
}
