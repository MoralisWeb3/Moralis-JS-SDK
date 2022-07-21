import { ConfigKey, SolNetworkish } from '@moralisweb3/core/lib';

export const SolApiConfig = {
  defaultSolNetwork: {
    name: 'defaultSolNetwork',
    defaultValue: 'mainnet',
  } as ConfigKey<SolNetworkish>,
};
