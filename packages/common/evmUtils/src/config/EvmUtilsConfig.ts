import { ConfigKey, EvmChainIdFormat, EvmAddressFormat } from '@moralisweb3/core';

export const EvmUtilsConfig = {
  formatEvmChainId: {
    name: 'formatEvmChainId',
    defaultValue: 'hex',
  } as ConfigKey<EvmChainIdFormat>,
  formatEvmAddress: {
    name: 'formatEvmAddress',
    defaultValue: 'lowercase',
  } as ConfigKey<EvmAddressFormat>,
};
