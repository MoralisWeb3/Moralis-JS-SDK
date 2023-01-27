// $ref: #/components/schemas/blockDate

export interface AptBlockDateJSON {
  readonly date: string;
  readonly block: number;
  readonly timestamp: number;
  readonly block_timestamp?: string;
  readonly hash?: string;
  readonly parent_hash?: string;
}

export interface AptBlockDateInput {
  readonly date: string;
  readonly block: number;
  readonly timestamp: number;
  readonly blockTimestamp?: string;
  readonly hash?: string;
  readonly parentHash?: string;
}

export class AptBlockDate {
  public static create(input: AptBlockDateInput): AptBlockDate {
    return new AptBlockDate(input);
  }

  public static fromJSON(json: AptBlockDateJSON): AptBlockDate {
    const input: AptBlockDateInput = {
      date: json.date,
      block: json.block,
      timestamp: json.timestamp,
      blockTimestamp: json.block_timestamp,
      hash: json.hash,
      parentHash: json.parent_hash,
    };
    return AptBlockDate.create(input);
  }

  /**
   * @description The date of the block
   */
  public readonly date: string;
  /**
   * @description The block number
   */
  public readonly block: number;
  /**
   * @description The timestamp of the block
   */
  public readonly timestamp: number;
  /**
   * @description The timestamp of the block
   */
  public readonly blockTimestamp?: string;
  /**
   * @description The block hash
   */
  public readonly hash?: string;
  /**
   * @description The block hash of the parent block
   */
  public readonly parentHash?: string;

  private constructor(input: AptBlockDateInput) {
    this.date = input.date;
    this.block = input.block;
    this.timestamp = input.timestamp;
    this.blockTimestamp = input.blockTimestamp;
    this.hash = input.hash;
    this.parentHash = input.parentHash;
  }

  public toJSON(): AptBlockDateJSON {
    return {
      date: this.date,
      block: this.block,
      timestamp: this.timestamp,
      block_timestamp: this.blockTimestamp,
      hash: this.hash,
      parent_hash: this.parentHash,
    };
  }
}
