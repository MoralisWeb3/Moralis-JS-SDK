import { ConfigKey } from '@moralisweb3/common-core';

export const StreamsConfig = {
  streamsSecret: {
    name: 'streamsSecret',
    defaultValue: null,
  } as ConfigKey<string | null>,
};
