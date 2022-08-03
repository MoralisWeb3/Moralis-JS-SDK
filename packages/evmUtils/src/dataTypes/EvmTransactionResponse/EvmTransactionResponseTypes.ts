import { BigNumber } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmNative } from '../EvmNative';
import { EvmTransactionInput } from '../EvmTransaction';
import { BytesLike, AccessList } from '../types';

/**
 * Options to intialise a new EvmTransactionResponse
 */
export interface EvmTransactionResponseInput extends EvmTransactionInput {
  from: EvmAddressish;

  /** The transaction hash */
  hash: string;

  /** Number of mined blocks since the transaction was mined */
  confirmations?: null | number;
  /** Number of the block when the transaction was mined, null if the transaction is not mined yet  */
  blockNumber?: null | number;
  /** Hash of the block when the transaction was mined, null if the transaction is not mined yet  */
  blockHash?: null | string;
  /** Timestamp of the block when the transaction was mined, null if the transaction is not mined yet  */
  blockTimestamp?: null | number | Date;
}

/**
 * Values of a published transaction
 */
export interface EvmTransactionResponseData extends EvmTransactionResponseInput {
  from: EvmAddress;
  to?: EvmAddress;
  nonce: BigNumber;

  chain: EvmChain;
  data?: BytesLike;

  gasLimit?: BigNumber;
  gasPrice?: BigNumber;

  type?: number;

  value: EvmNative;

  confirmations?: number;
  blockNumber?: number;
  blockHash?: string;
  blockTimestamp?: Date;

  accessList?: AccessList;

  maxPriorityFeePerGas?: BigNumber;
  maxFeePerGas?: BigNumber;
}
