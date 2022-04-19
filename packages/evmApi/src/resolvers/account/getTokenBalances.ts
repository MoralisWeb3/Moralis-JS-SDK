import { ERC20Token } from '@moralis/core';
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
    data.map(
      (token) =>
        new ERC20Token({
          balance: token.balance,
          decimals: token.decimals,
          name: token.name,
          symbol: token.symbol,
          tokenAddress: token.token_address,
          logo: token.logo,
          thumbnail: token.thumbnail,
        }),
    ),
  resultToJson: (data) => data.map((token) => token.toJSON()),
  parseParams: (params) => params,
});
