import { ConfigKey, EvmChainIdFormat } from '@moralisweb3/common-core';
import { EvmChainish } from '../dataTypes';

export const CommonEvmUtilsConfig = {
  formatEvmChainId: {
    name: 'formatEvmChainId',
    defaultValue: 'hex',
  } as ConfigKey<EvmChainIdFormat>,
  defaultEvmApiChain: {
    name: 'defaultEvmApiChain',
    defaultValue: '0x1',
  } as ConfigKey<EvmChainish>,
};
