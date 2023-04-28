import { EvmAddress, EvmAddressInput, EvmAddressJSON, EvmNative, EvmNativeInput, EvmNativeJSON } from '../../dataTypes';
import { BigNumber, BigNumberInput, BigNumberJSON } from '@moralisweb3/common-core';

// $ref: #/components/schemas/trade
// type: trade
// properties:
// - transaction_hash ($ref: #/components/schemas/trade/properties/transaction_hash)
// - transaction_index ($ref: #/components/schemas/trade/properties/transaction_index)
// - token_ids ($ref: #/components/schemas/trade/properties/token_ids)
// - seller_address ($ref: #/components/schemas/trade/properties/seller_address)
// - buyer_address ($ref: #/components/schemas/trade/properties/buyer_address)
// - token_address ($ref: #/components/schemas/trade/properties/token_address)
// - marketplace_address ($ref: #/components/schemas/trade/properties/marketplace_address)
// - price_token_address ($ref: #/components/schemas/trade/properties/price_token_address)
// - price ($ref: #/components/schemas/trade/properties/price)
// - block_timestamp ($ref: #/components/schemas/trade/properties/block_timestamp)
// - block_number ($ref: #/components/schemas/trade/properties/block_number)
// - block_hash ($ref: #/components/schemas/trade/properties/block_hash)

export interface EvmTradeJSON {
  readonly transaction_hash: string;
  readonly transaction_index: string;
  readonly token_ids: string[];
  readonly seller_address: EvmAddressJSON;
  readonly buyer_address: EvmAddressJSON;
  readonly token_address: EvmAddressJSON;
  readonly marketplace_address: EvmAddressJSON;
  readonly price_token_address?: EvmAddressJSON;
  readonly price: EvmNativeJSON;
  readonly block_timestamp: string;
  readonly block_number: BigNumberJSON;
  readonly block_hash: string;
}

export interface EvmTradeInput {
  readonly transactionHash: string;
  readonly transactionIndex: number;
  readonly tokenIds: string[];
  readonly sellerAddress: EvmAddressInput | EvmAddress;
  readonly buyerAddress: EvmAddressInput | EvmAddress;
  readonly tokenAddress: EvmAddressInput | EvmAddress;
  readonly marketplaceAddress: EvmAddressInput | EvmAddress;
  readonly priceTokenAddress?: EvmAddressInput | EvmAddress;
  readonly price: EvmNativeInput | EvmNative;
  readonly blockTimestamp: Date;
  readonly blockNumber: BigNumberInput | BigNumber;
  readonly blockHash: string;
}

export class EvmTrade {
  public static create(input: EvmTradeInput | EvmTrade): EvmTrade {
    if (input instanceof EvmTrade) {
      return input;
    }
    return new EvmTrade(input);
  }

  public static fromJSON(json: EvmTradeJSON): EvmTrade {
    const input: EvmTradeInput = {
      transactionHash: json.transaction_hash,
      transactionIndex: parseInt(json.transaction_index, 10),
      tokenIds: json.token_ids,
      sellerAddress: EvmAddress.fromJSON(json.seller_address),
      buyerAddress: EvmAddress.fromJSON(json.buyer_address),
      tokenAddress: EvmAddress.fromJSON(json.token_address),
      marketplaceAddress: EvmAddress.fromJSON(json.marketplace_address),
      priceTokenAddress: json.price_token_address ? EvmAddress.fromJSON(json.price_token_address) : undefined,
      price: EvmNative.fromJSON(json.price),
      blockTimestamp: new Date(json.block_timestamp),
      blockNumber: BigNumber.fromJSON(json.block_number),
      blockHash: json.block_hash,
    };
    return EvmTrade.create(input);
  }

  /**
   * @description The transaction hash
   */
  public readonly transactionHash: string;
  /**
   * @description The transaction index
   */
  public readonly transactionIndex: number;
  /**
   * @description The token ID(s) traded
   */
  public readonly tokenIds: string[];
  /**
   * @description The address that sold the NFT
   */
  public readonly sellerAddress: EvmAddress;
  /**
   * @description The address that bought the NFT
   */
  public readonly buyerAddress: EvmAddress;
  /**
   * @description The address of the NFT contract
   */
  public readonly tokenAddress: EvmAddress;
  /**
   * @description The address of the contract that traded the NFT
   */
  public readonly marketplaceAddress: EvmAddress;
  /**
   * @description The address of the token used to pay for the NFT
   */
  public readonly priceTokenAddress?: EvmAddress;
  /**
   * @description The value that was sent in the transaction (ETH/BNB/etc..)
   */
  public readonly price: EvmNative;
  /**
   * @description The block timestamp
   */
  public readonly blockTimestamp: Date;
  /**
   * @description The block number of the transaction
   */
  public readonly blockNumber: BigNumber;
  /**
   * @description The block hash
   */
  public readonly blockHash: string;

  private constructor(input: EvmTradeInput) {
    this.transactionHash = input.transactionHash;
    this.transactionIndex = input.transactionIndex;
    this.tokenIds = input.tokenIds;
    this.sellerAddress = EvmAddress.create(input.sellerAddress);
    this.buyerAddress = EvmAddress.create(input.buyerAddress);
    this.tokenAddress = EvmAddress.create(input.tokenAddress);
    this.marketplaceAddress = EvmAddress.create(input.marketplaceAddress);
    this.priceTokenAddress = input.priceTokenAddress ? EvmAddress.create(input.priceTokenAddress) : undefined;
    this.price = EvmNative.create(input.price);
    this.blockTimestamp = input.blockTimestamp;
    this.blockNumber = BigNumber.create(input.blockNumber);
    this.blockHash = input.blockHash;
  }

  public toJSON(): EvmTradeJSON {
    return {
      transaction_hash: this.transactionHash,
      transaction_index: String(this.transactionIndex),
      token_ids: this.tokenIds,
      seller_address: this.sellerAddress.toJSON(),
      buyer_address: this.buyerAddress.toJSON(),
      token_address: this.tokenAddress.toJSON(),
      marketplace_address: this.marketplaceAddress.toJSON(),
      price_token_address: this.priceTokenAddress ? this.priceTokenAddress.toJSON() : undefined,
      price: this.price.toJSON(),
      block_timestamp: this.blockTimestamp.toISOString(),
      block_number: this.blockNumber.toJSON(),
      block_hash: this.blockHash,
    }
  }
}
