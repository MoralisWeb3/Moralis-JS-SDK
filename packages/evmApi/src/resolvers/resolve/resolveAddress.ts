import { EvmAddress, EvmAddressish, Camelize } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'resolveAddress';

type PathParams = operations[operation]['parameters']['path'];
type ApiParams = PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'address'>> {
  address?: EvmAddressish;
}

export const resolveAddressResolver = new EvmResolver({
  name: 'resolveAddress',
  getPath: (params: Params) => `resolve/${params.address}/reverse`,
  apiToResult: (data: ApiResult) => data,
  resultToJson: (data) => data,
  parseParams: (params: Params) => ({
    address: params.address ? EvmAddress.create(params.address).lowercase : undefined,
  }),
});
