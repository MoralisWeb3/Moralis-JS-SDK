// $ref: #/components/schemas/nftTransfer

export interface AptNftTransferJSON {
  readonly token_address: string;
  readonly token_id: string;
  readonly from_address?: string;
  readonly to_address: string;
  readonly value?: string;
  readonly amount?: string;
  readonly contract_type: string;
  readonly block_number: string;
  readonly block_timestamp: string;
  readonly block_hash: string;
  readonly transaction_hash: string;
  readonly transaction_type?: string;
  readonly transaction_index?: number;
  readonly log_index: number;
  readonly operator?: string;
}

export interface AptNftTransferInput {
  readonly tokenAddress: string;
  readonly tokenId: string;
  readonly fromAddress?: string;
  readonly toAddress: string;
  readonly value?: string;
  readonly amount?: string;
  readonly contractType: string;
  readonly blockNumber: string;
  readonly blockTimestamp: string;
  readonly blockHash: string;
  readonly transactionHash: string;
  readonly transactionType?: string;
  readonly transactionIndex?: number;
  readonly logIndex: number;
  readonly operator?: string;
}

export class AptNftTransfer {
  public static create(input: AptNftTransferInput): AptNftTransfer {
    return new AptNftTransfer(input);
  }

  public static fromJSON(json: AptNftTransferJSON): AptNftTransfer {
    const input: AptNftTransferInput = {
      tokenAddress: json.token_address,
      tokenId: json.token_id,
      fromAddress: json.from_address,
      toAddress: json.to_address,
      value: json.value,
      amount: json.amount,
      contractType: json.contract_type,
      blockNumber: json.block_number,
      blockTimestamp: json.block_timestamp,
      blockHash: json.block_hash,
      transactionHash: json.transaction_hash,
      transactionType: json.transaction_type,
      transactionIndex: json.transaction_index,
      logIndex: json.log_index,
      operator: json.operator,
    };
    return AptNftTransfer.create(input);
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
   * @description The address that sent the NFT
   */
  public readonly fromAddress?: string;
  /**
   * @description The address that received the NFT
   */
  public readonly toAddress: string;
  /**
   * @description The value that was sent in the transaction (ETH/BNB/etc..)
   */
  public readonly value?: string;
  /**
   * @description The number of tokens transferred
   */
  public readonly amount?: string;
  /**
   * @description The type of NFT contract standard
   */
  public readonly contractType: string;
  /**
   * @description The block number of the transaction
   */
  public readonly blockNumber: string;
  /**
   * @description The block timestamp
   */
  public readonly blockTimestamp: string;
  /**
   * @description The block hash of the transaction
   */
  public readonly blockHash: string;
  /**
   * @description The transaction hash
   */
  public readonly transactionHash: string;
  /**
   * @description The transaction type
   */
  public readonly transactionType?: string;
  /**
   * @description The transaction index
   */
  public readonly transactionIndex?: number;
  /**
   * @description The log index
   */
  public readonly logIndex: number;
  /**
   * @description The operator present only for ERC1155 transfers
   */
  public readonly operator?: string;

  private constructor(input: AptNftTransferInput) {
    this.tokenAddress = input.tokenAddress;
    this.tokenId = input.tokenId;
    this.fromAddress = input.fromAddress;
    this.toAddress = input.toAddress;
    this.value = input.value;
    this.amount = input.amount;
    this.contractType = input.contractType;
    this.blockNumber = input.blockNumber;
    this.blockTimestamp = input.blockTimestamp;
    this.blockHash = input.blockHash;
    this.transactionHash = input.transactionHash;
    this.transactionType = input.transactionType;
    this.transactionIndex = input.transactionIndex;
    this.logIndex = input.logIndex;
    this.operator = input.operator;
  }

  public toJSON(): AptNftTransferJSON {
    return {
      token_address: this.tokenAddress,
      token_id: this.tokenId,
      from_address: this.fromAddress,
      to_address: this.toAddress,
      value: this.value,
      amount: this.amount,
      contract_type: this.contractType,
      block_number: this.blockNumber,
      block_timestamp: this.blockTimestamp,
      block_hash: this.blockHash,
      transaction_hash: this.transactionHash,
      transaction_type: this.transactionType,
      transaction_index: this.transactionIndex,
      log_index: this.logIndex,
      operator: this.operator,
    };
  }
}
