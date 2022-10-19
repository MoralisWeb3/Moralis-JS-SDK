import { ConfigKey } from '@moralisweb3/core';
import { SolNetworkish } from '../dataTypes';

export const SolUtilsConfig = {
  defaultSolNetwork: {
    name: 'defaultSolNetwork',
    defaultValue: 'mainnet',
  } as ConfigKey<SolNetworkish>,
};
