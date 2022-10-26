import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { maybe, toCamelCase } from '@moralisweb3/common-core';
import { EvmAddress, EvmAddressish, EvmChain, EvmChainish, EvmNftMetadata } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

// Old name: getNFTMetadata
type operation = 'getNFTContractMetadata';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export const getNFTContractMetadata = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getNFTContractMetadata',
    urlParams: ['address'],
    getUrl: (params: Params) => `/nft/${params.address}/metadata`,
    apiToResult: (data: ApiResult, params: Params) =>
      EvmNftMetadata.create({
        ...toCamelCase(data),
        chain: EvmChainResolver.resolve(params.chain, core),
        tokenAddress: EvmAddress.create(data.token_address, core),
        syncedAt: data.synced_at ? new Date(data.synced_at) : null,
        contractType: maybe(data.contract_type),
      }),
    resultToJson: (data) => data.toJSON(),
    parseParams: (params: Params): ApiParams => ({
      chain: params.chain ? EvmChain.create(params.chain, core).apiHex : undefined,
      address: EvmAddress.create(params.address, core).lowercase,
    }),
  }),
);
