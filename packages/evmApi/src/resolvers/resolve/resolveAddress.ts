import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';

type operation = 'resolveAddress';

type PathParams = operations[operation]['parameters']['path'];
type ApiParams = PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'address'>> {
  address?: EvmAddressish;
}

export const resolveAddress = createEndpointFactory((core) =>
  createEndpoint({
    name: 'resolveAddress',
    urlParams: ['address'],
    getUrl: (params: Params) => `/resolve/${params.address}/reverse`,
    apiToResult: (data: ApiResult) => data,
    resultToJson: (data) => data,
    parseParams: (params: Params) => ({
      address: params.address ? EvmAddress.create(params.address, core).lowercase : undefined,
    }),
  }),
);
