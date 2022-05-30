import { Erc20Token, Erc20Value } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'getTokenBalances';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getTokenBalancesResolver = new EvmResolver({
  getPath: (params: ApiParams) => `${params.address}/erc20`,
  apiToResult: (data: ApiResult) =>
    data.map((token) => ({
      token: new Erc20Token({
        decimals: token.decimals,
        name: token.name,
        symbol: token.symbol,
        contractAddress: token.token_address,
        logo: token.logo,
        thumbnail: token.thumbnail,
        // TODO: add chain info (or omit it from Erc20Token type)
        chain: 0,
      }),
      value: new Erc20Value(token.balance, token.decimals),
    })),
  resultToJson: (data) => data.map(({ token, value }) => ({ token: token.toJSON(), value: value.format() })),
  parseParams: (params) => params,
});
