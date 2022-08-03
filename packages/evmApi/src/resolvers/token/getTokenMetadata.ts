import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';

import { Camelize, toCamelCase } from '@moralisweb3/core';
import { Erc20Token, EvmChainish, EvmAddressish, EvmAddress } from '@moralisweb3/evm-utils';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getTokenMetadata';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'addresses'>> {
  chain?: EvmChainish;
  addresses: EvmAddressish[];
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getTokenMetadata = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getTokenMetadata',
    getUrl: () => `${BASE_URL}/erc20/metadata`,
    apiToResult: (data: ApiResult, params: Params) =>
      data.map((token) => {
        const tokenType = new Erc20Token({
          ...toCamelCase(token),
          contractAddress: token.address,
          chain: EvmChainResolver.resolve(params.chain, core),
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
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      addresses: params.addresses.map((address) => EvmAddress.create(address, core).lowercase),
    }),
  }),
);
