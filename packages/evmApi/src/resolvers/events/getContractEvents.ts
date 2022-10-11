import {
  createPaginatedEndpointFactory,
  createPaginatedEndpoint,
  PaginatedParams,
  EndpointBodyType,
} from '@moralisweb3/api-utils';
import { Camelize } from '@moralisweb3/core';
import { EvmChainish, EvmAddress, EvmAddressish, EvmEvent } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getContractEvents';
const method = 'post';
const bodyParams = ['abi'] as const;

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedParams {
  chain?: EvmChainish;
  address: EvmAddressish;
  abi: unknown;
}
type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getContractEvents = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'getContractEvents',
    group: 'events',
    urlParams: ['address'],
    getUrl: (params: Params) => `/${params.address}/events`,
    apiToResult: (data: ApiResult, params: Params) => {
      return (data.result ?? [])?.map((event) =>
        EvmEvent.create(
          {
            chain: EvmChainResolver.resolve(params.chain, core),
            address: params.address,
            blockHash: event.block_hash,
            blockNumber: event.block_number,
            blockTimestamp: event.block_timestamp,
            transactionHash: event.transaction_hash,
            data: {
              to: event.data.to,
              from: event.data.from,
              value: event.data.value,
            },
          },
          core,
        ),
      );
    },
    resultToJson: (data) => data,
    parseParams: (params: Params) => ({
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      from_block: params.fromBlock,
      to_block: params.toBlock,
      from_date: params.fromDate,
      to_date: params.toDate,
      providerUrl: params.providerUrl,
      topic: params.topic,
      limit: params.limit,
      offset: params.offset,
      subdomain: params.subdomain,
      address: EvmAddress.create(params.address, core).lowercase,
      abi: params.abi,
    }),
    method,
    bodyParams,
    bodyType: EndpointBodyType.BODY,
    firstPageIndex: 0,
  }),
);
