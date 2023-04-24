import { ConfigKey, EvmChainish } from '@moralisweb3/common-core';

export const EvmApiConfig = {
  evmApiBaseUrl: {
    name: 'evmApiBaseUrl',
    defaultValue: 'https://deep-index.moralis.io/api/v2',
  } as ConfigKey<string>,

  defaultEvmApiChain: {
    name: 'defaultEvmApiChain',
    defaultValue: '0x1',
  } as ConfigKey<EvmChainish>,
};
