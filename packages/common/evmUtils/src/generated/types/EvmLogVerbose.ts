import { EvmAddress, EvmAddressInput, EvmAddressJSON } from '../../dataTypes';
import { BigNumber, BigNumberInput, BigNumberJSON } from '@moralisweb3/common-core';
import { EvmDecodedEvent, EvmDecodedEventInput, EvmDecodedEventJSON } from '../types/EvmDecodedEvent';

// $ref: #/components/schemas/logVerbose
// type: logVerbose
// properties:
// - log_index ($ref: #/components/schemas/logVerbose/properties/log_index)
// - transaction_hash ($ref: #/components/schemas/logVerbose/properties/transaction_hash)
// - transaction_index ($ref: #/components/schemas/logVerbose/properties/transaction_index)
// - address ($ref: #/components/schemas/logVerbose/properties/address)
// - data ($ref: #/components/schemas/logVerbose/properties/data)
// - topic0 ($ref: #/components/schemas/logVerbose/properties/topic0)
// - topic1 ($ref: #/components/schemas/logVerbose/properties/topic1)
// - topic2 ($ref: #/components/schemas/logVerbose/properties/topic2)
// - topic3 ($ref: #/components/schemas/logVerbose/properties/topic3)
// - block_timestamp ($ref: #/components/schemas/logVerbose/properties/block_timestamp)
// - block_number ($ref: #/components/schemas/logVerbose/properties/block_number)
// - block_hash ($ref: #/components/schemas/logVerbose/properties/block_hash)
// - decoded_event ($ref: #/components/schemas/decodedEvent)

export interface EvmLogVerboseJSON {
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
  readonly decoded_event: EvmDecodedEventJSON;
}

export interface EvmLogVerboseInput {
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
  readonly decodedEvent: EvmDecodedEventInput | EvmDecodedEvent;
}

export class EvmLogVerbose {
  public static create(input: EvmLogVerboseInput | EvmLogVerbose): EvmLogVerbose {
    if (input instanceof EvmLogVerbose) {
      return input;
    }
    return new EvmLogVerbose(input);
  }

  public static fromJSON(json: EvmLogVerboseJSON): EvmLogVerbose {
    const input: EvmLogVerboseInput = {
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
      decodedEvent: EvmDecodedEvent.fromJSON(json.decoded_event),
    };
    return EvmLogVerbose.create(input);
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
  /**
   * @description The decoded data of the log
   */
  public readonly decodedEvent: EvmDecodedEvent;

  private constructor(input: EvmLogVerboseInput) {
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
    this.decodedEvent = EvmDecodedEvent.create(input.decodedEvent);
  }

  public toJSON(): EvmLogVerboseJSON {
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
      decoded_event: this.decodedEvent.toJSON(),
    }
  }
}
