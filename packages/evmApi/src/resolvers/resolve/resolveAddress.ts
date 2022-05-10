import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'resolveAddress';

type PathParams = operations[operation]['parameters']['path'];
type ApiParams = PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const resolveAddressResolver = new EvmResolver({
  getPath: (params: ApiParams) => `resolve/${params.address}/reverse`,
  apiToResult: (data: ApiResult) => data,
  resultToJson: (data) => data,
  parseParams: (params) => params,
});
