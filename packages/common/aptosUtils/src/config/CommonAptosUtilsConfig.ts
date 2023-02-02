import { ConfigKey } from '@moralisweb3/common-core';
import { AptosNetworkish } from '../dataTypes';

export const CommonAptosUtilsConfig = {
  defaultAptosNetwork: {
    name: 'defaultAptosNetwork',
    defaultValue: 'mainnet',
  } as ConfigKey<AptosNetworkish>,
};
