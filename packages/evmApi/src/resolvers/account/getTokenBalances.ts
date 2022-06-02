import { resolveDefaultAddress, resolveDefaultChain } from './../../utils/resolveDefaultParams';
import { Erc20Token, Erc20Value, EvmAddressish, EvmChainish, Camelize } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'getTokenBalances';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address?: EvmAddressish;
}

export const getTokenBalancesResolver = new EvmResolver({
  name: 'getTokenBalances',
  getPath: (params: ApiParams) => `${params.address}/erc20`,
  apiToResult: (data: ApiResult, params: ApiParams) =>
    data.map((token) => ({
      token: new Erc20Token({
        decimals: token.decimals,
        name: token.name,
        symbol: token.symbol,
        contractAddress: token.token_address,
        logo: token.logo,
        thumbnail: token.thumbnail,
        chain: resolveDefaultChain(params.chain),
      }),
      value: new Erc20Value(token.balance, token.decimals),
    })),
  resultToJson: (data) => data.map(({ token, value }) => ({ token: token.toJSON(), value: value.format() })),
  parseParams: (params: Params): ApiParams => ({
    to_block: params.toBlock,
    token_addresses: params.tokenAddresses,
    chain: resolveDefaultChain(params.chain).apiHex,
    address: resolveDefaultAddress(params.address).lowercase,
  }),
});
