import { ConfigKey } from '@moralisweb3/common-core';
import { SolNetworkish } from '../dataTypes';

export const CommonSolUtilsConfig = {
  defaultSolNetwork: {
    name: 'defaultSolNetwork',
    defaultValue: 'mainnet',
  } as ConfigKey<SolNetworkish>,
};
