import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'getTokenAllowance';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getTokenAllowanceResolver = new EvmResolver({
  getPath: (params: ApiParams) => `erc20/${params.address}/allowance`,
  apiToResult: (data: ApiResult) => ({
    ...data
  }),
  resultToJson: (data) => ({
    ...data
  }),
  parseParams: (params) => params,
});
