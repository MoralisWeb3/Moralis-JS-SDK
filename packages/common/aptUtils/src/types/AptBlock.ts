import { AptBlockTransaction, AptBlockTransactionJSON } from '../types/AptBlockTransaction';

// $ref: #/components/schemas/block

export interface AptBlockJSON {
  readonly timestamp: string;
  readonly number: string;
  readonly hash: string;
  readonly parent_hash: string;
  readonly nonce: string;
  readonly sha3_uncles: string;
  readonly logs_bloom: string;
  readonly transactions_root: string;
  readonly state_root: string;
  readonly receipts_root: string;
  readonly miner: string;
  readonly difficulty: string;
  readonly total_difficulty: string;
  readonly size: string;
  readonly extra_data: string;
  readonly gas_limit: string;
  readonly gas_used: string;
  readonly transaction_count: string;
  readonly transactions: AptBlockTransactionJSON[];
}

export interface AptBlockInput {
  readonly timestamp: string;
  readonly number: string;
  readonly hash: string;
  readonly parentHash: string;
  readonly nonce: string;
  readonly sha3Uncles: string;
  readonly logsBloom: string;
  readonly transactionsRoot: string;
  readonly stateRoot: string;
  readonly receiptsRoot: string;
  readonly miner: string;
  readonly difficulty: string;
  readonly totalDifficulty: string;
  readonly size: string;
  readonly extraData: string;
  readonly gasLimit: string;
  readonly gasUsed: string;
  readonly transactionCount: string;
  readonly transactions: AptBlockTransaction[];
}

export class AptBlock {
  public static create(input: AptBlockInput): AptBlock {
    return new AptBlock(input);
  }

  public static fromJSON(json: AptBlockJSON): AptBlock {
    const input: AptBlockInput = {
      timestamp: json.timestamp,
      number: json.number,
      hash: json.hash,
      parentHash: json.parent_hash,
      nonce: json.nonce,
      sha3Uncles: json.sha3_uncles,
      logsBloom: json.logs_bloom,
      transactionsRoot: json.transactions_root,
      stateRoot: json.state_root,
      receiptsRoot: json.receipts_root,
      miner: json.miner,
      difficulty: json.difficulty,
      totalDifficulty: json.total_difficulty,
      size: json.size,
      extraData: json.extra_data,
      gasLimit: json.gas_limit,
      gasUsed: json.gas_used,
      transactionCount: json.transaction_count,
      transactions: json.transactions.map((item) => AptBlockTransaction.fromJSON(item)),
    };
    return AptBlock.create(input);
  }

  /**
   * @description The block timestamp
   */
  public readonly timestamp: string;
  /**
   * @description The block number
   */
  public readonly number: string;
  /**
   * @description The block hash
   */
  public readonly hash: string;
  /**
   * @description The block hash of the parent block
   */
  public readonly parentHash: string;
  /**
   * @description The nonce
   */
  public readonly nonce: string;
  public readonly sha3Uncles: string;
  public readonly logsBloom: string;
  public readonly transactionsRoot: string;
  public readonly stateRoot: string;
  public readonly receiptsRoot: string;
  /**
   * @description The address of the miner
   */
  public readonly miner: string;
  /**
   * @description The difficulty of the block
   */
  public readonly difficulty: string;
  /**
   * @description The total difficulty
   */
  public readonly totalDifficulty: string;
  /**
   * @description The block size
   */
  public readonly size: string;
  public readonly extraData: string;
  /**
   * @description The gas limit
   */
  public readonly gasLimit: string;
  /**
   * @description The gas used
   */
  public readonly gasUsed: string;
  /**
   * @description The number of transactions in the block
   */
  public readonly transactionCount: string;
  /**
   * @description The transactions in the block
   */
  public readonly transactions: AptBlockTransaction[];

  private constructor(input: AptBlockInput) {
    this.timestamp = input.timestamp;
    this.number = input.number;
    this.hash = input.hash;
    this.parentHash = input.parentHash;
    this.nonce = input.nonce;
    this.sha3Uncles = input.sha3Uncles;
    this.logsBloom = input.logsBloom;
    this.transactionsRoot = input.transactionsRoot;
    this.stateRoot = input.stateRoot;
    this.receiptsRoot = input.receiptsRoot;
    this.miner = input.miner;
    this.difficulty = input.difficulty;
    this.totalDifficulty = input.totalDifficulty;
    this.size = input.size;
    this.extraData = input.extraData;
    this.gasLimit = input.gasLimit;
    this.gasUsed = input.gasUsed;
    this.transactionCount = input.transactionCount;
    this.transactions = input.transactions;
  }

  public toJSON(): AptBlockJSON {
    return {
      timestamp: this.timestamp,
      number: this.number,
      hash: this.hash,
      parent_hash: this.parentHash,
      nonce: this.nonce,
      sha3_uncles: this.sha3Uncles,
      logs_bloom: this.logsBloom,
      transactions_root: this.transactionsRoot,
      state_root: this.stateRoot,
      receipts_root: this.receiptsRoot,
      miner: this.miner,
      difficulty: this.difficulty,
      total_difficulty: this.totalDifficulty,
      size: this.size,
      extra_data: this.extraData,
      gas_limit: this.gasLimit,
      gas_used: this.gasUsed,
      transaction_count: this.transactionCount,
      transactions: this.transactions.map((item) => item.toJSON()),
    }
  }
}
