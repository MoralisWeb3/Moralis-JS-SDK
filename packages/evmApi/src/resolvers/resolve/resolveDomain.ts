import { EvmAddress } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'resolveDomain';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const resolveDomainResolver = new EvmResolver({
  name: 'resolveDomain',
  getPath: (params: ApiParams) => `resolve/${params.domain}`,
  apiToResult: (data: ApiResult) => ({
    address: EvmAddress.create(data.address),
  }),
  resultToJson: (data) => ({
    address: data.address.format(),
  }),
  parseParams: (params) => params,
});
