import { ApiResolver } from '@moralisweb3/api-utils';
import { EvmAddress, EvmAddressish, Camelize } from '@moralisweb3/core';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';

type operation = 'resolveAddress';

type PathParams = operations[operation]['parameters']['path'];
type ApiParams = PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'address'>> {
  address?: EvmAddressish;
}

export const resolveAddressResolver = new ApiResolver({
  name: 'resolveAddress',
  getUrl: (params: Params) => `${BASE_URL}/resolve/${params.address}/reverse`,
  apiToResult: (data: ApiResult) => data,
  resultToJson: (data) => data,
  parseParams: (params: Params) => ({
    address: params.address ? EvmAddress.create(params.address).lowercase : undefined,
  }),
});
