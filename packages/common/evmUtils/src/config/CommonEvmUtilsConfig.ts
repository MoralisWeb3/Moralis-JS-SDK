import { ConfigKey } from '@moralisweb3/common-core';
import { EvmChainish } from '../dataTypes';

export const CommonEvmUtilsConfig = {
  defaultEvmApiChain: {
    name: 'defaultEvmApiChain',
    defaultValue: '0x1',
  } as ConfigKey<EvmChainish>,
};
