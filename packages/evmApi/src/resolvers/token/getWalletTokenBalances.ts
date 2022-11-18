import { Camelize } from '@moralisweb3/core';
import { Erc20Value, EvmAddressish, EvmChainish, EvmAddress } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';
import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { EvmChainResolver } from '../EvmChainResolver';

// Old name: getTokenBalances
type operation = 'getWalletTokenBalances';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export const getWalletTokenBalances = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getWalletTokenBalances',
    urlParams: ['address'],
    getUrl: (params: Params) => `/${params.address}/erc20`,
    apiToResult: (data: ApiResult, params: Params) => {
      return (data ?? []).map((token) =>
        Erc20Value.create(token.balance, {
          decimals: token.decimals,
          token: {
            decimals: token.decimals,
            name: token.name,
            symbol: token.symbol,
            contractAddress: token.token_address,
            logo: token.logo,
            thumbnail: token.thumbnail,
            chain: EvmChainResolver.resolve(params.chain, core),
          },
        }, core),
      );
    },
    resultToJson: (data) => data.map((tokenValue) => tokenValue.toJSON()),
    parseParams: (params: Params): ApiParams => ({
      to_block: params.toBlock,
      token_addresses: params.tokenAddresses,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      address: EvmAddress.create(params.address, core).lowercase,
    }),
  }),
);
