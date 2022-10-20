import { ConfigKey, EvmChainIdFormat, EvmAddressFormat } from '@moralisweb3/core';
import { EvmChainish } from '../dataTypes';

export const EvmUtilsConfig = {
  formatEvmChainId: {
    name: 'formatEvmChainId',
    defaultValue: 'hex',
  } as ConfigKey<EvmChainIdFormat>,
  formatEvmAddress: {
    name: 'formatEvmAddress',
    defaultValue: 'lowercase',
  } as ConfigKey<EvmAddressFormat>,
  defaultEvmApiChain: {
    name: 'defaultEvmApiChain',
    defaultValue: '0x1',
  } as ConfigKey<EvmChainish>,
};
