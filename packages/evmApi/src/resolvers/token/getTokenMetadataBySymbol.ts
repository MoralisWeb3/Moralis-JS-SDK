import { Camelize } from './../../utils/toCamelCase';
import { Erc20Token, EvmChainish, EvmChain } from '@moralis/core';
import { operations } from '../../generated/types';
import { toCamelCase } from '../../utils/toCamelCase';
import { EvmResolver } from '../Resolver';

type operation = 'getTokenMetadataBySymbol';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'chain'>> {
  chain?: EvmChainish;
}

export const getTokenMetadataBySymbolResolver = new EvmResolver({
  getPath: (params: ApiParams) => `/erc20/metadata/symbols`,
  apiToResult: (data: ApiResult) =>
    data.map((token) => {
      const erc20token = new Erc20Token({
        ...toCamelCase(token),
        contractAddress: token.address,
        // TODO: add chain info (or omit it from Erc20Token type)
        chain: 1,
      });
      return {
        token: erc20token,
        address: token.address,
        blockNumber: token.block_number,
        logoHash: token.logo_hash,
        validated: token.validated,
      };
    }),
  resultToJson: (data) => data.map((result) => ({ ...result, token: result.token.toJSON() })),
  parseParams: (params: Params): ApiParams => ({
    ...params,
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
  }),
});
