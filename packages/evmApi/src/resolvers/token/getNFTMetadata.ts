import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { toCamelCase } from '@moralisweb3/core';
import {
  EvmAddress,
  EvmAddressish,
  EvmChain,
  EvmChainish,
  EvmNftMetadata,
  validateValidEvmContractType,
} from '@moralisweb3/evm-utils';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getNFTMetadata';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export const getNFTMetadata = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getNFTMetadata',
    urlParams: ['address'],
    getUrl: (params: Params) => `${BASE_URL}/nft/${params.address}/metadata`,
    apiToResult: (data: ApiResult, params: Params) =>
      EvmNftMetadata.create({
        ...toCamelCase(data),
        chain: EvmChainResolver.resolve(params.chain, core),
        tokenAddress: EvmAddress.create(data.token_address, core),
        syncedAt: data.synced_at ? new Date(data.synced_at) : null,
        contractType: data.contract_type ? validateValidEvmContractType(data.contract_type) : null,
      }),
    resultToJson: (data) => data.toJSON(),
    parseParams: (params: Params): ApiParams => ({
      chain: params.chain ? EvmChain.create(params.chain, core).apiHex : undefined,
      address: EvmAddress.create(params.address, core).lowercase,
    }),
  }),
);
