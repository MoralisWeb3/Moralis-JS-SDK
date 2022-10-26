import { BigNumber, BigNumberish } from '@moralisweb3/common-core';
import { EvmAddress, EvmAddressish, EvmChainish, EvmChain, EvmSignature } from '@moralisweb3/common-evm-utils';

export interface StreamEvmTransactionInput {
  chain: EvmChainish;
  hash: string;
  gas?: BigNumberish | null;
  gasPrice?: BigNumberish | null;
  nonce?: BigNumberish | null;
  input?: string | null;
  transactionIndex: number | string;
  fromAddress: EvmAddressish;
  toAddress?: EvmAddressish | null;
  value?: BigNumberish | null;
  type?: number | string | null;
  receiptCumulativeGasUsed?: BigNumberish | null;
  receiptGasUsed?: BigNumberish | null;
  receiptContractAddress?: EvmAddressish | null;
  receiptRoot?: string | null;
  receiptStatus?: number | string | null;
  r?: string | null;
  s?: string | null;
  v?: number | string | null;
}

export interface StreamEvmTransactionData {
  chain: EvmChain;
  hash: string;
  gas?: BigNumber;
  gasPrice?: BigNumber;
  nonce?: BigNumber;
  input?: string;
  transactionIndex: number;
  fromAddress: EvmAddress;
  toAddress?: EvmAddress;
  value?: BigNumber;
  type?: number;
  receiptCumulativeGasUsed?: BigNumber;
  receiptGasUsed?: BigNumber;
  receiptContractAddress?: EvmAddress;
  receiptRoot?: string;
  receiptStatus?: number;
  signature?: EvmSignature;
}

export type StreamEvmTransactionJSON = {
  chain: string | number;
  hash: string;
  gas?: string;
  gasPrice?: string;
  nonce?: string;
  input?: string;
  transactionIndex: number;
  fromAddress: string;
  toAddress?: string;
  value?: string;
  type?: number;
  receiptCumulativeGasUsed?: string;
  receiptGasUsed?: string;
  receiptContractAddress?: string;
  receiptRoot?: string;
  receiptStatus?: number;
  r?: string;
  s?: string;
  v?: number;
};
