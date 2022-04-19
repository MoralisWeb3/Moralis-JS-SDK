import { EvmChain, EvmChainish } from '@moralis/core/lib';
import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'getDateToBlock';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;
export interface Params extends Omit<ApiParams, 'chain'> {
  chain?: EvmChainish;
  // TODO: also allow JS date input
  date: string;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getDateToBlockResolver = new EvmResolver<ApiParams, Params, ApiResult, ApiResult, ApiResult>({
  getPath: (params: Params) => `dateToBlock`,
  apiToResult: (data: ApiResult) => data,
  resultToJson: (data) => data,
  parseParams: (params) => ({
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
    date: params.date,
  }),
});
