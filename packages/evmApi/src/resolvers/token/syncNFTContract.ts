import { EvmChainish, EvmAddressish, EvmAddress, Camelize } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { resolveDefaultChain } from '../../utils/resolveDefaultParams';
import { EvmResolver } from '../Resolver';

const method = 'put';

type operation = 'syncNFTContract';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['201'];

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export const syncNFTContractResolver = new EvmResolver({
  name: 'syncNFTContract',
  getPath: (params: Params) => `nft/${params.address}/sync`,
  apiToResult: (data: ApiResult) => ({
    success: true,
  }),
  resultToJson: (data) => ({
    success: true,
  }),
  parseParams: (params: Params): ApiParams => ({
    chain: resolveDefaultChain(params.chain).apiHex,
    address: EvmAddress.create(params.address).lowercase,
  }),
  method,
});
