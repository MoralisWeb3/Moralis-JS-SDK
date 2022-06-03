import { Erc20Token, EvmChainish, Camelize, toCamelCase } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';
import { resolveDefaultChain } from '../../utils/resolveDefaultParams';

type operation = 'getTokenMetadataBySymbol';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'chain'>> {
  chain?: EvmChainish;
}

export const getTokenMetadataBySymbolResolver = new EvmResolver({
  name: 'getTokenMetadataBySymbol',
  getPath: () => `erc20/metadata/symbols`,
  apiToResult: (data: ApiResult, params: Params) =>
    data.map((token) => {
      const erc20token = new Erc20Token({
        ...toCamelCase(token),
        contractAddress: token.address,
        chain: resolveDefaultChain(params.chain),
      });
      return {
        token: erc20token,
        blockNumber: token.block_number,
        validated: token.validated,
      };
    }),
  resultToJson: (data) => data.map((result) => ({ ...result, token: result.token.toJSON() })),
  parseParams: (params: Params): ApiParams => ({
    ...params,
    chain: resolveDefaultChain(params.chain).apiHex,
  }),
});
