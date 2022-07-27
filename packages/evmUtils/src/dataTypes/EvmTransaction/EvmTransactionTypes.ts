import { BigNumber, BigNumberish } from '@moralisweb3/core';
import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmChainish } from '../EvmChain';
import { EvmNativeish, EvmNative } from '../EvmNative';
import { BytesLike, AccessListish, AccessList } from '../types';

/**
 * Options to intialise a new EvmTransaction, omitted values will automatically set
 */
export interface EvmTransactionInput {
  /** The sender of the transaction. */
  from?: EvmAddressish;
  /** The receiver of the transaction. */
  to?: EvmAddressish;
  /** The nonce for this transaction, should be equal to the total number of transactions sent from the address. */
  nonce?: BigNumberish;

  /** The chain this transaction is authorized on */
  chain: EvmChainish;
  /** The transaction data. */
  data?: null | BytesLike;
  /** The value that the transaction is sending in wei. */
  value?: null | EvmNativeish;

  /** The maximum amount of gas this transaction is permitted to use. When left empty, the gas usage will be estimated */
  gasLimit?: null | BigNumberish;
  /** The price in Wei, that the transaction will pay */
  gasPrice?: null | BigNumberish;
  /** The maximum price in wei per unit of gas this transaction will pay for the combined EIP-1559 block's base fee and this transaction's priority fee. */
  maxFeePerGas?: null | BigNumberish;
  /**  The price (in wei) per unit of gas this transaction will allow in addition to the EIP-1559 block's base fee. */
  maxPriorityFeePerGas?: null | BigNumberish;

  /** The EIP-2718 type of this transaction envelope, or null for to use the network default. */
  type?: null | number;
  /** The AccessList to include; only available for EIP-2930 and EIP-1559 transactions. */
  accessList?: null | AccessListish;
}

/**
 * Values of an non-published transaction
 */
export interface EvmTransactionData extends EvmTransactionInput {
  from: EvmAddress;
  to?: EvmAddress;
  nonce: BigNumber;

  chain: EvmChain;
  data?: BytesLike;
  value?: EvmNative;

  gasLimit?: BigNumber;
  gasPrice?: BigNumber;

  type?: number;
  accessList?: AccessList;

  maxPriorityFeePerGas?: BigNumber;
  maxFeePerGas?: BigNumber;
}

/**
 * Parsed data of an EvmTransaction, formatted to be used with EthersJs
 */
export interface EthersJsTransactionRequest {
  to?: string;
  from?: string;
  nonce?: BigNumberish;

  gasLimit?: BigNumberish;
  gasPrice?: BigNumberish;

  data?: BytesLike;
  value?: BigNumberish;
  chainId?: number;

  type?: number;
  accessList?: AccessListish;

  maxPriorityFeePerGas?: BigNumberish;
  maxFeePerGas?: BigNumberish;
}
