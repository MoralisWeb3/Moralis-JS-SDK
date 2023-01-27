// $ref: #/components/schemas/erc20Transaction

export interface AptErc20TransactionJSON {
  readonly transaction_hash: string;
  readonly address: string;
  readonly block_timestamp: string;
  readonly block_number: string;
  readonly block_hash: string;
  readonly to_address: string;
  readonly from_address: string;
  readonly value: string;
  readonly transaction_index: number;
  readonly log_index: number;
}

export interface AptErc20TransactionInput {
  readonly transactionHash: string;
  readonly address: string;
  readonly blockTimestamp: string;
  readonly blockNumber: string;
  readonly blockHash: string;
  readonly toAddress: string;
  readonly fromAddress: string;
  readonly value: string;
  readonly transactionIndex: number;
  readonly logIndex: number;
}

export class AptErc20Transaction {
  public static create(input: AptErc20TransactionInput): AptErc20Transaction {
    return new AptErc20Transaction(input);
  }

  public static fromJSON(json: AptErc20TransactionJSON): AptErc20Transaction {
    const input: AptErc20TransactionInput = {
      transactionHash: json.transaction_hash,
      address: json.address,
      blockTimestamp: json.block_timestamp,
      blockNumber: json.block_number,
      blockHash: json.block_hash,
      toAddress: json.to_address,
      fromAddress: json.from_address,
      value: json.value,
      transactionIndex: json.transaction_index,
      logIndex: json.log_index,
    };
    return AptErc20Transaction.create(input);
  }

  /**
   * @description The transaction hash
   */
  public readonly transactionHash: string;
  /**
   * @description The address of the token
   */
  public readonly address: string;
  /**
   * @description The block timestamp
   */
  public readonly blockTimestamp: string;
  /**
   * @description The block number
   */
  public readonly blockNumber: string;
  /**
   * @description The block hash
   */
  public readonly blockHash: string;
  /**
   * @description The recipient
   */
  public readonly toAddress: string;
  /**
   * @description The sender
   */
  public readonly fromAddress: string;
  /**
   * @description The value that was transferred (in wei)
   */
  public readonly value: string;
  /**
   * @description The transaction index of the transfer within the block
   */
  public readonly transactionIndex: number;
  /**
   * @description The log index of the transfer within the block
   */
  public readonly logIndex: number;

  private constructor(input: AptErc20TransactionInput) {
    this.transactionHash = input.transactionHash;
    this.address = input.address;
    this.blockTimestamp = input.blockTimestamp;
    this.blockNumber = input.blockNumber;
    this.blockHash = input.blockHash;
    this.toAddress = input.toAddress;
    this.fromAddress = input.fromAddress;
    this.value = input.value;
    this.transactionIndex = input.transactionIndex;
    this.logIndex = input.logIndex;
  }

  public toJSON(): AptErc20TransactionJSON {
    return {
      transaction_hash: this.transactionHash,
      address: this.address,
      block_timestamp: this.blockTimestamp,
      block_number: this.blockNumber,
      block_hash: this.blockHash,
      to_address: this.toAddress,
      from_address: this.fromAddress,
      value: this.value,
      transaction_index: this.transactionIndex,
      log_index: this.logIndex,
    };
  }
}
