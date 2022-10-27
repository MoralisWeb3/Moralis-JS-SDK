import { ConfigKey } from '@moralisweb3/common-core';
import { EvmChainish } from '@moralisweb3/common-evm-utils';

export const EvmApiConfig = {
  defaultEvmApiChain: {
    name: 'defaultEvmApiChain',
    defaultValue: '0x1',
  } as ConfigKey<EvmChainish>,
};
