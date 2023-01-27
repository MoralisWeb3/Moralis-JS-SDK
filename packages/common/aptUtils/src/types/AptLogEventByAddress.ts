// $ref: #/components/schemas/logEventByAddress

export interface AptLogEventByAddressJSON {
  readonly transaction_hash: string;
  readonly address: string;
  readonly block_timestamp: string;
  readonly block_number: string;
  readonly block_hash: string;
  readonly data: string;
  readonly topic0: string;
  readonly topic1: string;
  readonly topic2: string;
  readonly topic3: string;
  readonly transaction_index: number;
  readonly log_index: number;
}

export interface AptLogEventByAddressInput {
  readonly transactionHash: string;
  readonly address: string;
  readonly blockTimestamp: string;
  readonly blockNumber: string;
  readonly blockHash: string;
  readonly data: string;
  readonly topic0: string;
  readonly topic1: string;
  readonly topic2: string;
  readonly topic3: string;
  readonly transactionIndex: number;
  readonly logIndex: number;
}

export class AptLogEventByAddress {
  public static create(input: AptLogEventByAddressInput): AptLogEventByAddress {
    return new AptLogEventByAddress(input);
  }

  public static fromJSON(json: AptLogEventByAddressJSON): AptLogEventByAddress {
    const input: AptLogEventByAddressInput = {
      transactionHash: json.transaction_hash,
      address: json.address,
      blockTimestamp: json.block_timestamp,
      blockNumber: json.block_number,
      blockHash: json.block_hash,
      data: json.data,
      topic0: json.topic0,
      topic1: json.topic1,
      topic2: json.topic2,
      topic3: json.topic3,
      transactionIndex: json.transaction_index,
      logIndex: json.log_index,
    };
    return AptLogEventByAddress.create(input);
  }

  /**
   * @description The transaction hash
   */
  public readonly transactionHash: string;
  /**
   * @description The address of the contract
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
   * @description The data of the log
   */
  public readonly data: string;
  public readonly topic0: string;
  public readonly topic1: string;
  public readonly topic2: string;
  public readonly topic3: string;
  /**
   * @description The Transaction index of the log within the block
   */
  public readonly transactionIndex: number;
  /**
   * @description The log index of the log within the block
   */
  public readonly logIndex: number;

  private constructor(input: AptLogEventByAddressInput) {
    this.transactionHash = input.transactionHash;
    this.address = input.address;
    this.blockTimestamp = input.blockTimestamp;
    this.blockNumber = input.blockNumber;
    this.blockHash = input.blockHash;
    this.data = input.data;
    this.topic0 = input.topic0;
    this.topic1 = input.topic1;
    this.topic2 = input.topic2;
    this.topic3 = input.topic3;
    this.transactionIndex = input.transactionIndex;
    this.logIndex = input.logIndex;
  }

  public toJSON(): AptLogEventByAddressJSON {
    return {
      transaction_hash: this.transactionHash,
      address: this.address,
      block_timestamp: this.blockTimestamp,
      block_number: this.blockNumber,
      block_hash: this.blockHash,
      data: this.data,
      topic0: this.topic0,
      topic1: this.topic1,
      topic2: this.topic2,
      topic3: this.topic3,
      transaction_index: this.transactionIndex,
      log_index: this.logIndex,
    };
  }
}
