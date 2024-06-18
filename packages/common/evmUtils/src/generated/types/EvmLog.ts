import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { BigNumber, BigNumberInput, BigNumberJSON } from '@moralisweb3/common-core';

// $ref: #/components/schemas/log
// type: log
// properties:
// - log_index ($ref: #/components/schemas/log/properties/log_index)
// - transaction_hash ($ref: #/components/schemas/log/properties/transaction_hash)
// - transaction_index ($ref: #/components/schemas/log/properties/transaction_index)
// - address ($ref: #/components/schemas/log/properties/address)
// - data ($ref: #/components/schemas/log/properties/data)
// - topic0 ($ref: #/components/schemas/log/properties/topic0)
// - topic1 ($ref: #/components/schemas/log/properties/topic1)
// - topic2 ($ref: #/components/schemas/log/properties/topic2)
// - topic3 ($ref: #/components/schemas/log/properties/topic3)
// - block_timestamp ($ref: #/components/schemas/log/properties/block_timestamp)
// - block_number ($ref: #/components/schemas/log/properties/block_number)
// - block_hash ($ref: #/components/schemas/log/properties/block_hash)

export interface EvmLogJSON {
  readonly log_index: string;
  readonly transaction_hash: string;
  readonly transaction_index: string;
  readonly address: EvmAddressJSON;
  readonly data: string;
  readonly topic0: string;
  readonly topic1?: string;
  readonly topic2?: string;
  readonly topic3?: string;
  readonly block_timestamp: string;
  readonly block_number: BigNumberJSON;
  readonly block_hash: string;
}

export interface EvmLogInput {
  readonly logIndex: number;
  readonly transactionHash: string;
  readonly transactionIndex: number;
  readonly address: EvmAddressInput | EvmAddress;
  readonly data: string;
  readonly topic0: string;
  readonly topic1?: string;
  readonly topic2?: string;
  readonly topic3?: string;
  readonly blockTimestamp: string;
  readonly blockNumber: BigNumberInput | BigNumber;
  readonly blockHash: string;
}

export class EvmLog {
  public static create(input: EvmLogInput | EvmLog): EvmLog {
    if (input instanceof EvmLog) {
      return input;
    }
    return new EvmLog(input);
  }

  public static fromJSON(json: EvmLogJSON): EvmLog {
    const input: EvmLogInput = {
      logIndex: Number(json.log_index),
      transactionHash: json.transaction_hash,
      transactionIndex: Number(json.transaction_index),
      address: EvmAddress.fromJSON(json.address),
      data: json.data,
      topic0: json.topic0,
      topic1: json.topic1,
      topic2: json.topic2,
      topic3: json.topic3,
      blockTimestamp: json.block_timestamp,
      blockNumber: BigNumber.fromJSON(json.block_number),
      blockHash: json.block_hash,
    };
    return EvmLog.create(input);
  }

  public readonly logIndex: number;
  /**
   * @description The hash of the transaction
   */
  public readonly transactionHash: string;
  public readonly transactionIndex: number;
  /**
   * @description The address of the contract
   */
  public readonly address: EvmAddress;
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
  public readonly blockNumber: BigNumber;
  /**
   * @description The hash of the block
   */
  public readonly blockHash: string;

  private constructor(input: EvmLogInput) {
    this.logIndex = input.logIndex;
    this.transactionHash = input.transactionHash;
    this.transactionIndex = input.transactionIndex;
    this.address = EvmAddress.create(input.address);
    this.data = input.data;
    this.topic0 = input.topic0;
    this.topic1 = input.topic1;
    this.topic2 = input.topic2;
    this.topic3 = input.topic3;
    this.blockTimestamp = input.blockTimestamp;
    this.blockNumber = BigNumber.create(input.blockNumber);
    this.blockHash = input.blockHash;
  }

  public toJSON(): EvmLogJSON {
    return {
      log_index: String(this.logIndex),
      transaction_hash: this.transactionHash,
      transaction_index: String(this.transactionIndex),
      address: this.address.toJSON(),
      data: this.data,
      topic0: this.topic0,
      topic1: this.topic1,
      topic2: this.topic2,
      topic3: this.topic3,
      block_timestamp: this.blockTimestamp,
      block_number: this.blockNumber.toJSON(),
      block_hash: this.blockHash,
    }
  }
}
