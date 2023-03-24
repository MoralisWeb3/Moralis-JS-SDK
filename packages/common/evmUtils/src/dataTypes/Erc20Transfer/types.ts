import { BigNumber, BigNumberish, DateInput } from '@moralisweb3/common-core';
import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';

// TODO: get decimal value from api
/**
 * This can be any object with valid erc20 transfer data.
 * @example
 * ```
 * const input = {
 *  chain: 1,
 *  address: "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
 *  toAddress: "0x62AED87d21Ad0F3cdE4D147Fdcc9245401Af0044",
 *  fromAddress: "0xd4a3BebD824189481FC45363602b83C9c7e9cbDf",
 *  value: "650000000000000000",
 *  blockTimestamp: "2021-04-02T10:07:54.000Z",
 *  blockHash: "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86",
 *  blockNumber: "12526958",
 *  transactionHash: "0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09",
 *  transactionIndex: 3,
 *  possibleSpam: false,
 *  logIndex: 2
 * }
 * ```
 */
export interface Erc20TransferInput {
  chain: EvmChainish;
  transactionHash: string;
  address: EvmAddressish;
  blockTimestamp: DateInput;
  blockNumber: BigNumberish;
  blockHash: string;
  toAddress: EvmAddressish;
  fromAddress: EvmAddressish;
  value: BigNumberish;
  transactionIndex: number;
  logIndex: number;
  possibleSpam: boolean;
}

/**
 * This is the return type of Erc20Transfer
 */
export interface Erc20TransferData {
  chain: EvmChain;
  transactionHash: string;
  address: EvmAddress;
  blockTimestamp: Date;
  blockNumber: BigNumber;
  blockHash: string;
  toAddress: EvmAddress;
  fromAddress: EvmAddress;
  value: BigNumber;
  transactionIndex: number;
  logIndex: number;
  possibleSpam: boolean;
}
