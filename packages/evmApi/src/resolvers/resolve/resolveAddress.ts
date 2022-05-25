import { EvmAddress, EvmAddressish } from '@moralis/core';
import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'resolveAddress';

type PathParams = operations[operation]['parameters']['path'];
type ApiParams = PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params {
  address: EvmAddressish;
}

export const resolveAddressResolver = new EvmResolver({
  name: 'resolveAddress',
  getPath: (params: Params) => `resolve/${params.address}/reverse`,
  apiToResult: (data: ApiResult) => data,
  resultToJson: (data) => data,
  parseParams: (params: Params): ApiParams => ({
    address: EvmAddress.create(params.address).lowercase,
  }),
});
