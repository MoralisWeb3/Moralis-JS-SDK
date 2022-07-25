import { ApiPaginatedOptions, ApiPaginatedResolver, BodyType, ApiPaginatedResponse } from '@moralisweb3/api';
import { Camelize } from '@moralisweb3/core';
import { EvmChainish, EvmAddress, EvmAddressish } from '@moralisweb3/evm-utils';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getContractEvents';
const method = 'post';
const bodyParams = ['abi'] as const;

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, ApiPaginatedOptions {
  chain?: EvmChainish;
  address: EvmAddressish;
  abi: unknown;
}
type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getContractEventsResolver = new ApiPaginatedResolver({
  name: 'getContractEvents',
  getUrl: (params: Params) => `${BASE_URL}/${params.address}/events`,
  //   TODO: remove PaginatedResponse when api squad make swagger update
  apiToResult: (data: ApiPaginatedResponse<ApiResult>) =>
    data.result.map((event) => ({
      ...event,
      address: EvmAddress.create(event.address),
    })),
  resultToJson: (data) => data,
  parseParams: (params: Params) => ({
    chain: EvmChainResolver.resolve(params.chain).apiHex,
    from_block: params.fromBlock,
    to_block: params.toBlock,
    from_date: params.toDate,
    to_date: params.toDate,
    providerUrl: params.providerUrl,
    topic: params.topic,
    limit: params.limit,
    offset: params.offset,
    subdomain: params.subdomain,
    address: EvmAddress.create(params.address).lowercase,
    abi: params.abi,
  }),
  method,
  bodyParams,
  bodyType: BodyType.BODY,
});
