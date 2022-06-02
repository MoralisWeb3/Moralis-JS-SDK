import { Erc20Token, EvmChainish, EvmAddressish, EvmAddress, Camelize, toCamelCase } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { resolveDefaultChain } from '../../utils/resolveDefaultParams';
import { EvmResolver } from '../Resolver';

type operation = 'getTokenMetadata';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'addresses'>> {
  chain?: EvmChainish;
  addresses: EvmAddressish[];
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getTokenMetadataResolver = new EvmResolver({
  name: 'getTokenMetadata',
  getPath: () => `erc20/metadata`,
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
    addresses: params.addresses.map((address) => EvmAddress.create(address).format()),
  }),
});
