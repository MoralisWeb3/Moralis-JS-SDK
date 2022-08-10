import { BigNumber, BigNumberish, DateInput } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChain, EvmChainish, EvmNative, EvmNativeish } from '@moralisweb3/evm-utils';

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
    from: EvmAddress;
    to: EvmAddress;
    value: EvmNative;
  };
}
