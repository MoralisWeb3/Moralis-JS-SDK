import { ConfigKey } from '@moralisweb3/common-core';

export const SolApiConfig = {
  solApiBaseUrl: {
    name: 'solApiBaseUrl',
    defaultValue: 'https://solana-gateway.moralis.io',
  } as ConfigKey<string>,
};
