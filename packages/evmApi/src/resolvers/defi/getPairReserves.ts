import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'getPairReserves';

type PathParams = operations[operation]['parameters']['path'];
type ApiParams = PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getPairReservesResolver = new EvmResolver({
  getPath: (params: ApiParams) => `${params.pair_address}/reserves`,
  apiToResult: (data: ApiResult) => data,
  resultToJson: (data) => data,
  parseParams: (params) => params,
});
