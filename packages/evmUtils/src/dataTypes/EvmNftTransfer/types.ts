import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmSimpleBlock, EvmSimpleBlockish } from '../EvmBlock';
import { EvmChain, EvmChainish } from '../EvmChain';
import { EvmNativeish, EvmNative } from '../EvmNative';

/**
 * This can be any object with valid transfer data.
 * @example
 * ```
 * const input = {
 *  chain: 1,
 *  tokenAddress: "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
 *  toAddress: "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
 *  operator: null,
 *  fromAddress: "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
 *  value: null,
 *  blockTimestamp: "2021-06-04T16:00:15",
 *  blockHash: "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
 *  transactionIndex: 123,
 *  blockNumber: "88256",
 *  contractType: "ERC721",
 *  logIndex: 0,
 *  tokenId: "15",
 *  transactionHash: "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
 *  transactionType: "1",
 * }
 * ```
 */
export interface EvmNftTransferInput {
  chain: EvmChainish;
  amount?: null | string | number;
  contractType: string;
  fromAddress?: null | EvmAddressish;
  value?: null | EvmNativeish;
  logIndex: number | string;
  toAddress: EvmAddressish;
  tokenAddress: EvmAddressish;
  tokenId: string;
  transactionHash: string;
  transactionIndex?: null | string | number;
  transactionType?: null | string;
  operator?: null | EvmAddressish;
  block?: null | EvmSimpleBlockish;
}

/**
 * This is the return type of the processed EVM NFT Transfer.
 */
export interface EvmNftTransferData {
  chain: EvmChain;
  amount?: number;
  contractType: string;
  fromAddress?: EvmAddress;
  value?: EvmNative;
  logIndex: number;
  toAddress: EvmAddress;
  tokenAddress: EvmAddress;
  tokenId: string;
  transactionHash: string;
  transactionIndex?: number;
  transactionType?: string;
  operator?: EvmAddress;
  block?: EvmSimpleBlock;
}
