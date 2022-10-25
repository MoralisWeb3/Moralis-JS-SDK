import { ConfigKey } from '@moralisweb3/core';
import { SolNetworkish } from '../dataTypes';

export const CommonSolUtilsConfig = {
  defaultSolNetwork: {
    name: 'defaultSolNetwork',
    defaultValue: 'mainnet',
  } as ConfigKey<SolNetworkish>,
};
