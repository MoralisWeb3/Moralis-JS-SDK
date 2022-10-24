import { ConfigKey } from '@moralisweb3/core';

export const ApiConfig = {
  apiKey: {
    name: 'apiKey',
    defaultValue: null,
  } as ConfigKey<string | null>,
  sdkIntegration: {
    name: 'sdkIntegration',
    defaultValue: undefined,
  },
};
