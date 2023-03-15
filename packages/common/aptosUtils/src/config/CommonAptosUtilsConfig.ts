import { ConfigKey } from '@moralisweb3/common-core';
import { AptosNetworkInput } from '../dataTypes';

export const CommonAptosUtilsConfig = {
  defaultAptosNetwork: {
    name: 'defaultAptosNetwork',
    defaultValue: 'mainnet',
  } as ConfigKey<AptosNetworkInput>,
};
