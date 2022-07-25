import { ApiResolver } from '@moralisweb3/api';
import { Camelize } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress } from '@moralisweb3/evm-utils';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

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

export const syncNFTContractResolver = new ApiResolver({
  name: 'syncNFTContract',
  getUrl: (params: Params) => `${BASE_URL}/nft/${params.address}/sync`,
  apiToResult: (data: ApiResult) => ({
    success: true,
  }),
  resultToJson: (data) => ({
    success: true,
  }),
  parseParams: (params: Params): ApiParams => ({
    chain: EvmChainResolver.resolve(params.chain).apiHex,
    address: EvmAddress.create(params.address).lowercase,
  }),
  method,
});
