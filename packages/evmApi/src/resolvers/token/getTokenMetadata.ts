import { ApiResolver, resolveDefaultChain } from '@moralisweb3/api-utils';
import { Erc20Token, EvmChainish, EvmAddressish, EvmAddress, Camelize, toCamelCase } from '@moralisweb3/core';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';

type operation = 'getTokenMetadata';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'addresses'>> {
  chain?: EvmChainish;
  addresses: EvmAddressish[];
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getTokenMetadataResolver = new ApiResolver({
  name: 'getTokenMetadata',
  getUrl: () => `${BASE_URL}/erc20/metadata`,
  apiToResult: (data: ApiResult, params: Params) =>
    data.map((token) => {
      const tokenType = new Erc20Token({
        ...toCamelCase(token),
        contractAddress: token.address,
        chain: resolveDefaultChain(params.chain),
      });
      return {
        token: tokenType,
        blockNumber: token.block_number,
        validated: token.validated,
      };
    }),
  resultToJson: (data) => data.map((item) => ({ ...item, token: item.token.toJSON() })),
  parseParams: (params: Params): ApiParams => ({
    providerUrl: params.providerUrl || undefined,
    subdomain: params.subdomain || undefined,
    chain: resolveDefaultChain(params.chain).apiHex,
    addresses: params.addresses.map((address) => EvmAddress.create(address).lowercase),
  }),
});
