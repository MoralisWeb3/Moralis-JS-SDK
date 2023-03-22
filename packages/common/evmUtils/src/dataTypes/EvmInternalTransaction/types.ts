import { BigNumber, BigNumberish } from '@moralisweb3/common-core';
import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';

/**
 * Valid EvmInternalTransactionLog input.
 *
 * @example
 * ```ts
 * const input = {
 *   "chain": "0x1",
 *   "transactionHash": "0x2ac6283fb30fe33499416b0388ff27145a0eeb6aa8b37bca40af87d7f1c74e2d",
 *   "block_number": 16876143,
 *   "block_hash": "0xc8d7592122307a771c5172af09699b5a2d36fa540d0fbc656f3d52c619c7536e",
 *   "type": "STATICCALL",
 *   "from": "0x283af0b28c62c092c9727f1ee09c02ca627eb7f5",
 *   "to": "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
 *   "value": "0",
 *   "gas": "263200",
 *   "gas_used": "2569",
 *   "input": "0x96e494e8d40a37cd10c71cb3896d1b05b6c707e29cb5aeff0278c6fc7e5e5b31623a1baa",
 *   "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
 * }
 * ```
 */
export interface EvmInternalTransactionInput {
  chain: EvmChainish;
  transactionHash: string;
  blockNumber: BigNumberish;
  blockHash: string;
  type: string;
  from: EvmAddressish;
  to: EvmAddressish;
  value: BigNumberish;
  gas: BigNumberish;
  gasUsed: BigNumberish;
  input: string;
  output: string;
}

/**
 * Represents a processed internal transaction log.
 */
export interface EvmInternalTransactionData {
  chain: EvmChain;
  transactionHash: string;
  blockNumber: BigNumber;
  blockHash: string;
  type: string;
  from: EvmAddress;
  to: EvmAddress;
  value: BigNumber;
  gas: BigNumber;
  gasUsed: BigNumber;
  input: string;
  output: string;
}
