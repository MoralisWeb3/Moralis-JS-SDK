import { BigNumber, BigNumberish, DateInput } from '@moralisweb3/core';
import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';
import { EvmNativeish, EvmNative } from '../EvmNative';

/**
 * This can be any object with valid event data.
 * @example
 * ```
 * const transactionInput = {
 * chain: 1,
 * address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
 * blockHash: "0x1bb168d2725d15b12604c92a83c529617cd54a415c5d610a687f7859d45f9ea5",
 * blockNumber: "14327217",
 * blockTimestamp: "2022-03-05T13:45:42.000Z",
 * transactionHash: "0xc9f62f4f6ab505a96c1a84ec2899c6bfd86245ef1effaa689fc997798be763d5",
 * data: {
 *  to: "0x54e41aa7ac19efd71d19a3ca6b8a6c0154fe3afb",
 *  from: "0x21f510cc9f81df4e4d2c705e672761cf487cdc5a",
 *  value: "878000000",
 * },
 *}
 * ```
 */
export interface EvmEventInput {
  chain: EvmChainish;
  transactionHash: string;
  address: EvmAddressish;
  blockTimestamp: DateInput;
  blockNumber: BigNumberish;
  blockHash: string;
  data: {
    from?: EvmAddressish;
    to?: EvmAddressish;
    value?: EvmNativeish;
  };
}

/**
 * This is the return type of the processed EVM event
 */
export interface EvmEventData {
  chain: EvmChain;
  transactionHash: string;
  address: EvmAddress;
  blockTimestamp: Date;
  blockNumber: BigNumber;
  blockHash: string;
  data: {
    from?: EvmAddress;
    to?: EvmAddress;
    value?: EvmNative;
  };
}
