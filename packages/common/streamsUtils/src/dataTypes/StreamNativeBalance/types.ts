import { EvmAddress, EvmAddressish, EvmNative, EvmNativeish } from '@moralisweb3/common-evm-utils';

export interface StreamNativeBalanceInput {
  address: EvmAddressish;
  balance: EvmNativeish;
}

export interface StreamNativeBalanceData {
  address: EvmAddress;
  balance: EvmNative;
}

export type StreamNativeBalanceJSON = {
  address: string;
  balance: string;
};
