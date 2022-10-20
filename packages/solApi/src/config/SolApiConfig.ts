import { SolNetworkish } from '@moralisweb3/common-sol-utils';
import { ConfigKey } from '@moralisweb3/core';

export const SolApiConfig = {
  defaultSolNetwork: {
    name: 'defaultSolNetwork',
    defaultValue: 'mainnet',
  } as ConfigKey<SolNetworkish>,
};
