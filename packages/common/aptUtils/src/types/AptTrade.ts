// $ref: #/components/schemas/trade

export interface AptTradeJSON {
  readonly transaction_hash: string;
  readonly transaction_index: string;
  readonly token_ids: string[];
  readonly seller_address: string;
  readonly buyer_address: string;
  readonly marketplace_address: string;
  readonly price: string;
  readonly block_timestamp: string;
  readonly block_number: string;
  readonly block_hash: string;
}

export interface AptTradeInput {
  readonly transactionHash: string;
  readonly transactionIndex: string;
  readonly tokenIds: string[];
  readonly sellerAddress: string;
  readonly buyerAddress: string;
  readonly marketplaceAddress: string;
  readonly price: string;
  readonly blockTimestamp: string;
  readonly blockNumber: string;
  readonly blockHash: string;
}

export class AptTrade {
  public static create(input: AptTradeInput): AptTrade {
    return new AptTrade(input);
  }

  public static fromJSON(json: AptTradeJSON): AptTrade {
    const input: AptTradeInput = {
      transactionHash: json.transaction_hash,
      transactionIndex: json.transaction_index,
      tokenIds: json.token_ids,
      sellerAddress: json.seller_address,
      buyerAddress: json.buyer_address,
      marketplaceAddress: json.marketplace_address,
      price: json.price,
      blockTimestamp: json.block_timestamp,
      blockNumber: json.block_number,
      blockHash: json.block_hash,
    };
    return AptTrade.create(input);
  }

  /**
   * @description The transaction hash
   */
  public readonly transactionHash: string;
  /**
   * @description The transaction index
   */
  public readonly transactionIndex: string;
  /**
   * @description The token ID(s) traded
   */
  public readonly tokenIds: string[];
  /**
   * @description The address that sold the NFT
   */
  public readonly sellerAddress: string;
  /**
   * @description The address that bought the NFT
   */
  public readonly buyerAddress: string;
  /**
   * @description The address of the contract that traded the NFT
   */
  public readonly marketplaceAddress: string;
  /**
   * @description The value that was sent in the transaction (ETH/BNB/etc..)
   */
  public readonly price: string;
  /**
   * @description The block timestamp
   */
  public readonly blockTimestamp: string;
  /**
   * @description The block number of the transaction
   */
  public readonly blockNumber: string;
  /**
   * @description The block hash
   */
  public readonly blockHash: string;

  private constructor(input: AptTradeInput) {
    this.transactionHash = input.transactionHash;
    this.transactionIndex = input.transactionIndex;
    this.tokenIds = input.tokenIds;
    this.sellerAddress = input.sellerAddress;
    this.buyerAddress = input.buyerAddress;
    this.marketplaceAddress = input.marketplaceAddress;
    this.price = input.price;
    this.blockTimestamp = input.blockTimestamp;
    this.blockNumber = input.blockNumber;
    this.blockHash = input.blockHash;
  }

  public toJSON(): AptTradeJSON {
    return {
      transaction_hash: this.transactionHash,
      transaction_index: this.transactionIndex,
      token_ids: this.tokenIds,
      seller_address: this.sellerAddress,
      buyer_address: this.buyerAddress,
      marketplace_address: this.marketplaceAddress,
      price: this.price,
      block_timestamp: this.blockTimestamp,
      block_number: this.blockNumber,
      block_hash: this.blockHash,
    };
  }
}
