import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize, toCamelCase } from '@moralisweb3/core';
import { Erc20Token, EvmChainish } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getTokenMetadataBySymbol';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'chain'>> {
  chain?: EvmChainish;
}

export const getTokenMetadataBySymbol = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getTokenMetadataBySymbol',
    group: 'token',
    getUrl: () => `/erc20/metadata/symbols`,
    apiToResult: (data: ApiResult, params: Params) =>
      (data ?? []).map((token) => {
        return {
          token: Erc20Token.create(
            {
              ...toCamelCase(token),
              contractAddress: token.address,
              chain: EvmChainResolver.resolve(params.chain, core),
            },
            core,
          ),
          blockNumber: token.block_number,
          validated: token.validated,
        };
      }),
    resultToJson: (data) => data.map((result) => ({ ...result, token: result.token.toJSON() })),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
    }),
  }),
);
