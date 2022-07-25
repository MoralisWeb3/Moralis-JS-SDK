import { BigNumber, BigNumberish } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish } from '../EvmAddress';
import { EvmTransactionLog, EvmTransactionLogInput } from '../EvmTransactionLog';
import { EvmTransactionResponse } from '../EvmTransactionResponse/EvmTransactionResponse';

export interface EvmTransactionReceiptInput {
  /** Address of the contract when the transacrion constructs a new contract. In this case 'to' is not specified */
  contractAddress?: null | EvmAddressish;
  /** The index of this transaction in the list of transactions included in the block this transaction was mined in */
  transactionIndex: number;

  /** The amount of gas actually used by this transaction */
  gasUsed: BigNumberish;
  /** For the block this transaction was included in, this is the sum of the gas used by each transaction. */
  cumulativeGasUsed: BigNumberish;
  /**
   * The gas price the transaction was charged at.
   * Prior to EIP-1559 or on chains that do not support it, this value will simply be equal to the transaction gasPrice.
   * On EIP-1559 chains, this is equal to the block baseFee for the block that the transaction was included in, plus the transaction maxPriorityFeePerGas clamped to the transaction maxFeePerGas
   */
  gasPrice: BigNumberish;

  /** All the logs emitted by this transaction. */
  logs?: EvmTransactionLogInput[];

  /** The intermediate state root of a receipt (Only transactions included in blocks before the Byzantium Hard Fork have this property, as it was replaced by the status property) */
  root?: null | string;
  /** The status of a transaction is 1 is successful or 0 if it was reverted. Only transactions included in blocks post-Byzantium Hard Fork have this property */
  status?: null | number;
  /** The number of confirmed blocks */
  confirmations?: number;
}

export interface EvmTransactionReceiptData {
  /** Address of the contract when the transacrion constructs a new contract. In this case 'to' is not specified */
  contractAddress?: EvmAddress;
  /** The index of this transaction in the list of transactions included in the block this transaction was mined in */
  transactionIndex: number;

  /** The amount of gas actually used by this transaction */
  gasUsed: BigNumber;
  /** For the block this transaction was included in, this is the sum of the gas used by each transaction. */
  cumulativeGasUsed: BigNumber;
  /**
   * The gas price the transaction was charged at.
   * Prior to EIP-1559 or on chains that do not support it, this value will simply be equal to the transaction gasPrice.
   * On EIP-1559 chains, this is equal to the block baseFee for the block that the transaction was included in, plus the transaction maxPriorityFeePerGas clamped to the transaction maxFeePerGas
   */
  gasPrice: BigNumber;

  /** All the logs emitted by this transaction. */
  logs?: EvmTransactionLog[];

  /** The intermediate state root of a receipt (Only transactions included in blocks before the Byzantium Hard Fork have this property, as it was replaced by the status property) */
  root?: string;
  /** The status of a transaction is 1 is successful or 0 if it was reverted. Only transactions included in blocks post-Byzantium Hard Fork have this property */
  status?: number;
  /** The number of confirmed blocks */
  confirmations?: number;

  /** Reference to the transactionResponse of the receipt */
  transaction: EvmTransactionResponse;
}
