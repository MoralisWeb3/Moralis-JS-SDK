import { ConfigKey } from '@moralisweb3/common-core';

export const EvmApiConfig = {
  evmApiBaseUrl: {
    name: 'evmApiBaseUrl',
    defaultValue: 'https://deep-index.moralis.io/api/v2',
  } as ConfigKey<string>,
};
