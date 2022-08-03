import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { EvmAddress } from '@moralisweb3/evm-utils';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';

type operation = 'resolveDomain';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const resolveDomain = createEndpointFactory((core) =>
  createEndpoint({
    name: 'resolveDomain',
    getUrl: (params: ApiParams) => `${BASE_URL}/resolve/${params.domain}`,
    apiToResult: (data: ApiResult) => ({
      address: EvmAddress.create(data.address, core),
    }),
    resultToJson: (data) => ({
      address: data.address.format(),
    }),
    parseParams: (params) => params,
  }),
);
