import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';

type operation = 'web3ApiVersion';

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const web3ApiVersion = createEndpointFactory(() =>
  createEndpoint({
    name: 'web3ApiVersion',
    getUrl: () => `${BASE_URL}/web3/version`,
    apiToResult: (data: ApiResult) => data,
    resultToJson: (data) => data,
    parseParams: (params) => params,
  }),
);
