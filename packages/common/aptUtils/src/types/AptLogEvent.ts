import { AptLogEventData, AptLogEventDataJSON } from '../types/AptLogEventData';

// $ref: #/components/schemas/logEvent

export interface AptLogEventJSON {
  readonly transaction_hash: string;
  readonly address: string;
  readonly block_timestamp: string;
  readonly block_number: string;
  readonly block_hash: string;
  readonly data: AptLogEventDataJSON;
}

export interface AptLogEventInput {
  readonly transactionHash: string;
  readonly address: string;
  readonly blockTimestamp: string;
  readonly blockNumber: string;
  readonly blockHash: string;
  readonly data: AptLogEventData;
}

export class AptLogEvent {
  public static create(input: AptLogEventInput): AptLogEvent {
    return new AptLogEvent(input);
  }

  public static fromJSON(json: AptLogEventJSON): AptLogEvent {
    const input: AptLogEventInput = {
      transactionHash: json.transaction_hash,
      address: json.address,
      blockTimestamp: json.block_timestamp,
      blockNumber: json.block_number,
      blockHash: json.block_hash,
      data: AptLogEventData.fromJSON(json.data),
    };
    return AptLogEvent.create(input);
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
   * @description The content of the event
   */
  public readonly data: AptLogEventData;

  private constructor(input: AptLogEventInput) {
    this.transactionHash = input.transactionHash;
    this.address = input.address;
    this.blockTimestamp = input.blockTimestamp;
    this.blockNumber = input.blockNumber;
    this.blockHash = input.blockHash;
    this.data = input.data;
  }

  public toJSON(): AptLogEventJSON {
    return {
      transaction_hash: this.transactionHash,
      address: this.address,
      block_timestamp: this.blockTimestamp,
      block_number: this.blockNumber,
      block_hash: this.blockHash,
      data: this.data.toJSON(),
    }
  }
}
