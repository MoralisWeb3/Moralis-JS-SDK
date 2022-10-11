import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { dateInputToDate } from '@moralisweb3/core';
import { EvmChainish } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getDateToBlock';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;
export interface Params extends Omit<ApiParams, 'chain'> {
  chain?: EvmChainish;
  // TODO: also allow JS date input in every date input
  date: string;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getDateToBlock = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getDateToBlock',
    group: 'block',
    getUrl: () => `/dateToBlock`,
    apiToResult: (data: ApiResult) => ({
      ...data,
      date: new Date(data.date),
    }),
    resultToJson: (data) => ({
      ...data,
      date: dateInputToDate(data.date),
    }),
    parseParams: (params: Params): ApiParams => ({
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      date: params.date,
    }),
  }),
);
