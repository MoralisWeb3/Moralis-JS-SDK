import { BigNumber, BigNumberish, DateInput } from '@moralisweb3/common-core';
import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';

/**
 * This can be any object with valid erc20 mint data.
 * @example
 * ```
 * const input = {
 *   chain: 1,
 *   fromWallet: "0x09f4fc6081026c85070886599e83f599ecf82405",
 *   contractAddress: "0xa0e8fed3426391fdb446516799c4d6248e2b2860",
 *   blockHash: "0xa5f87d4341642b89e3ccb81449e3083032c36fface2c2042941b8bd9afe83f79",
 *   blockNumber: "16868690",
 *   blockTimestamp: "2023-03-20T11:48:59.000Z",
 *   transactionHash: "0xb7b4d321e2ab26c1cde1a2ef49413e21b65dcc663d6de8f75ddbdd868b98b4bf",
 *   transactionIndex: "4",
 *   logIndex: "25",
 *   value: "100000000000000000000000000000"
 * }
 * ```
 */
export interface Erc20BurnInput {
  chain: EvmChainish;
  fromWallet: EvmAddressish;
  contractAddress: EvmAddressish;
  blockHash: string;
  blockNumber: BigNumberish;
  blockTimestamp: DateInput;
  transactionHash: string;
  transactionIndex: number;
  logIndex: number;
  value: BigNumberish;
}

/**
 * This is the return type of Erc20Mint
 */
export interface Erc20BurnData {
  chain: EvmChain;
  fromWallet: EvmAddress;
  contractAddress: EvmAddress;
  blockHash: string;
  blockNumber: BigNumber;
  blockTimestamp: Date;
  transactionHash: string;
  transactionIndex: number;
  logIndex: number;
  value: BigNumber;
}
