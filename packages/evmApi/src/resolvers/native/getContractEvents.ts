import { EvmChain, EvmChainish, EvmAddress, EvmAddressish } from '@moralis/core';
import { operations } from '../../generated/types';
import { Camelize } from '../../utils/toCamelCase';
import { BodyType, EvmResolver } from '../Resolver';

type operation = 'getContractEvents';
const method = 'post';
const bodyParams = ['abi'] as const;

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address?: EvmAddressish;
  abi: unknown;
}
type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getContractEventsResolver = new EvmResolver({
  name: 'getContractEvents',
  getPath: (params: Params) => `${params.address}/events`,
  apiToResult: (data: ApiResult) =>
    data.map((event) => ({
      ...event,
      address: EvmAddress.create(event.address),
    })),
  resultToJson: (data) => data,
  parseParams: (params: Params) => ({
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
    from_block: params.fromBlock,
    to_block: params.toBlock,
    from_date: params.toDate,
    to_date: params.toDate,
    providerUrl: params.providerUrl,
    topic: params.topic,
    limit: params.limit,
    offset: params.offset,
    subdomain: params.subdomain,
    address: params.address ? EvmAddress.create(params.address).lowercase : undefined,
    abi: params.abi,
  }),
  method,
  bodyParams,
  bodyType: BodyType.BODY,
});
