import { BigNumber, BigNumberish } from '@moralisweb3/core';
import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmSimpleBlock, EvmSimpleBlockish } from '../EvmBlock';
import { EvmChain, EvmChainish } from '../EvmChain';
import { EvmNativeish, EvmNative } from '../EvmNative';
import { EvmTransactionLogish, EvmTransactionLog } from '../EvmTransactionLog';
import { EvmSignature, EvmSignatureish } from './EvmSignature';

/**
 * This can be any object with valid transaction data.
 * @example
 * ```
 * const transactionInput = {
          cumulativeGasUsed: "1340925",
          gasPrice: "20000000000",
          gasUsed: "1340925",
          index: "25",
          contractAddress: "0x1d6a4cf64b52f6c73f201839aded7379ce58059c",
          receiptRoot: "string",
          receiptStatus: "1",
          chain: "1",
          data: "0x000000000000000000000000000000000000000000000000000000000000002",
          from: "0xd4a3BebD824189481FC45363602b83C9c7e9cbDf",
          hash: "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
          nonce: "326595425",
          value: "650000000000000000",
          gas: "6721975",
          to: "0xa71db868318f0a0bae9411347cd4a6fa23d8d4ef",
          signature: {
            v: 28,
            r: "0xda4429a9e8e6b54cb101b2df002039f2879ab4ca0e8fae64134942cb81f3e581",
            s: "0x3b90a37dc078a82dfc418695b1d4473661aa4d24dd874ac68678894ff44a6b27",
          },
          block: {
            hash: "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86",
            number: "12526958",
            timestamp: new Date("2021-04-02T10:07:54.000Z"),
          }
        }
 * ```
 */
export interface EvmTransactionInput {
  chain: EvmChainish;

  from: EvmAddressish;
  to?: null | EvmAddressish;
  nonce?: null | BigNumberish;
  data?: null | string;
  value?: null | EvmNativeish;
  hash: string;

  type?: null | number | string;

  gas?: null | BigNumberish;
  gasPrice?: null | BigNumberish;

  index: number | string;

  // After receipt
  cumulativeGasUsed?: null | BigNumberish;
  gasUsed?: null | BigNumberish;
  contractAddress?: null | EvmAddressish;
  receiptRoot?: null | string;
  receiptStatus?: null | string | number;

  logs?: EvmTransactionLogish[];

  signature?: EvmSignatureish;
  block?: EvmSimpleBlockish;
}

/**
 * This is the return type of the processed EVM transaction
 */
export interface EvmTransactionData {
  chain: EvmChain;

  from: EvmAddress;
  to?: EvmAddress;
  nonce?: BigNumber;
  data?: string;
  value?: EvmNative;
  hash: string;

  type?: number;

  gas?: BigNumber;
  gasPrice?: BigNumber;

  index: number;

  // After receipt
  cumulativeGasUsed?: BigNumber;
  gasUsed?: BigNumber;
  contractAddress?: EvmAddress;
  receiptRoot?: string;
  receiptStatus?: number;

  logs: EvmTransactionLog[];

  signature?: EvmSignature;
  block?: EvmSimpleBlock;
}
