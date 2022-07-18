import { ApiResolver, resolveDefaultChain } from '@moralisweb3/api';
import { EvmChainish } from '@moralisweb3/core';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';

type operation = 'getDateToBlock';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;
export interface Params extends Omit<ApiParams, 'chain'> {
  chain?: EvmChainish;
  // TODO: also allow JS date input in every date input
  date: string;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getDateToBlockResolver = new ApiResolver({
  name: 'getDateToBlock',
  getUrl: () => `${BASE_URL}/dateToBlock`,
  apiToResult: (data: ApiResult) => ({
    ...data,
    date: new Date(data.date),
  }),
  resultToJson: (data) => ({
    ...data,
    date: data.date.toLocaleDateString(),
  }),
  parseParams: (params: Params): ApiParams => ({
    chain: resolveDefaultChain(params.chain).apiHex,
    date: params.date,
  }),
});
