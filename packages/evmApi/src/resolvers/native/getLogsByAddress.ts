import { ApiPaginatedOptions, ApiPaginatedResolver } from '@moralisweb3/api';
import { EvmChainish, EvmAddressish, EvmAddress, EvmTransactionLog, Camelize, toCamelCase } from '@moralisweb3/core';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getLogsByAddress';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, ApiPaginatedOptions {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getLogsByAddressResolver = new ApiPaginatedResolver({
  name: 'getLogsByAddress',
  getUrl: (params: Params) => `${BASE_URL}/${params.address}/logs`,
  apiToResult: (data: ApiResult) =>
    data.result?.map(
      (log) =>
        new EvmTransactionLog({
          ...toCamelCase(log),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          topics: [log.topic0, log.topic1!, log.topic2!, log.topic3!],
          blockNumber: Number(log.block_number),
        }),
    ),
  resultToJson: (data) => data?.map((log) => log.toJSON()),
  parseParams: (params: Params): ApiParams => ({
    ...params,
    chain: EvmChainResolver.resolve(params.chain).apiHex,
    address: EvmAddress.create(params.address).lowercase,
  }),
});
