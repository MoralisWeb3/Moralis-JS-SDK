import { BigNumber, BigNumberish, DateInput } from '@moralisweb3/core';
import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';
import { EvmNativeish, EvmNative } from '../EvmNative';

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
