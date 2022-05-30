import { EvmChain, EvmChainish } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'getDateToBlock';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;
export interface Params extends Omit<ApiParams, 'chain'> {
  chain?: EvmChainish;
  // TODO: also allow JS date input in every date input
  date: string;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getDateToBlockResolver = new EvmResolver({
  getPath: () => `dateToBlock`,
  apiToResult: (data: ApiResult) => ({
    ...data,
    date: new Date(data.date),
  }),
  resultToJson: (data) => ({
    ...data,
    date: data.date.toLocaleDateString(),
  }),
  parseParams: (params: Params): ApiParams => ({
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
    date: params.date,
  }),
});
