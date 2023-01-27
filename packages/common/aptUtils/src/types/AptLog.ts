
// $ref: #/components/schemas/log

export interface AptLogJSON {
  readonly log_index: string;
  readonly transaction_hash: string;
  readonly transaction_index: string;
  readonly address: string;
  readonly data: string;
  readonly topic0: string;
  readonly topic1?: string;
  readonly topic2?: string;
  readonly topic3?: string;
  readonly block_timestamp: string;
  readonly block_number: string;
  readonly block_hash: string;
}

export interface AptLogInput {
  readonly logIndex: string;
  readonly transactionHash: string;
  readonly transactionIndex: string;
  readonly address: string;
  readonly data: string;
  readonly topic0: string;
  readonly topic1?: string;
  readonly topic2?: string;
  readonly topic3?: string;
  readonly blockTimestamp: string;
  readonly blockNumber: string;
  readonly blockHash: string;
}

export class AptLog {
  public static create(input: AptLogInput): AptLog {
    return new AptLog(input);
  }

  public static fromJSON(json: AptLogJSON): AptLog {
    const input: AptLogInput = {
      logIndex: json.log_index,
      transactionHash: json.transaction_hash,
      transactionIndex: json.transaction_index,
      address: json.address,
      data: json.data,
      topic0: json.topic0,
      topic1: json.topic1,
      topic2: json.topic2,
      topic3: json.topic3,
      blockTimestamp: json.block_timestamp,
      blockNumber: json.block_number,
      blockHash: json.block_hash,
    };
    return AptLog.create(input);
  }

  public readonly logIndex: string;
  /**
   * @description The hash of the transaction
   */
  public readonly transactionHash: string;
  public readonly transactionIndex: string;
  /**
   * @description The address of the contract
   */
  public readonly address: string;
  /**
   * @description The data of the log
   */
  public readonly data: string;
  public readonly topic0: string;
  public readonly topic1?: string;
  public readonly topic2?: string;
  public readonly topic3?: string;
  /**
   * @description The timestamp of the block
   */
  public readonly blockTimestamp: string;
  /**
   * @description The block number
   */
  public readonly blockNumber: string;
  /**
   * @description The hash of the block
   */
  public readonly blockHash: string;

  private constructor(input: AptLogInput) {
    this.logIndex = input.logIndex;
    this.transactionHash = input.transactionHash;
    this.transactionIndex = input.transactionIndex;
    this.address = input.address;
    this.data = input.data;
    this.topic0 = input.topic0;
    this.topic1 = input.topic1;
    this.topic2 = input.topic2;
    this.topic3 = input.topic3;
    this.blockTimestamp = input.blockTimestamp;
    this.blockNumber = input.blockNumber;
    this.blockHash = input.blockHash;
  }

  public toJSON(): AptLogJSON {
    return {
      log_index: this.logIndex,
      transaction_hash: this.transactionHash,
      transaction_index: this.transactionIndex,
      address: this.address,
      data: this.data,
      topic0: this.topic0,
      topic1: this.topic1,
      topic2: this.topic2,
      topic3: this.topic3,
      block_timestamp: this.blockTimestamp,
      block_number: this.blockNumber,
      block_hash: this.blockHash,
    }
  }
}
