import { BigNumber, BigNumberish, DateInput } from '@moralisweb3/common-core';
import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';
import { EvmNativeish, EvmNative } from '../EvmNative';

/**
 * This can be any object with valid trade data.
 * @example
 * ```
 * const tradeInput = {
 * chain: 1,
 * sellerAddress: "0xbae90f486d751f133702655627ce599249cd26b8",
 * buyerAddress: "0x8795e90de359c1e0bf2579646486f7f12f270d2f",
 * marketplaceAddress: "0x7be8076f4ea4a4ad08075c2508e481d6c946d12b",
 * tokenAddress: "0xdf7952b35f24acf7fc0487d01c8d5690a60dba07",
 * price: "280000000000000000",
 * blockTimestamp: "2021-05-09T23:00:25.000Z",
 * tokenIds: ["16404"],
 * blockHash: "0xe870c197b0c614e055f4de5b264bc7c69eafc93a6d0ce300309de444b2ff7e3a",
 * blockNumber: 1,
 * transactionHash: "0x4de0bcef1450492bd5c2e7693cf644c40005868d0dcc8a7a50a80ef2efa88d1e",
 * transactionIndex: "164"
 *}
 * ```
 */
export interface EvmNftTradeInput {
  chain: EvmChainish;
  transactionHash: string;
  transactionIndex: string | number;
  tokenIds: string[];
  sellerAddress: EvmAddressish;
  buyerAddress: EvmAddressish;
  tokenAddress: EvmAddressish;
  marketplaceAddress: EvmAddressish;
  price: EvmNativeish;
  priceTokenAddress?: null | EvmAddressish;
  blockTimestamp: DateInput;
  blockNumber: BigNumberish;
  blockHash: string;
}

/**
 * This is the return type of the processed EVM trade
 */
export interface EvmNftTradeData {
  chain: EvmChain;
  transactionHash: string;
  transactionIndex: number;
  tokenIds: string[];
  sellerAddress: EvmAddress;
  buyerAddress: EvmAddress;
  tokenAddress: EvmAddress;
  marketplaceAddress: EvmAddress;
  price: EvmNative;
  priceTokenAddress?: EvmAddress;
  blockTimestamp: Date;
  blockNumber: BigNumber;
  blockHash: string;
}
