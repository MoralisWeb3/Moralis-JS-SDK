import { toCamelCase } from './../../utils/toCamelCase';
import { EvmChain, EvmChainish, EvmAddressish, EvmAddress, EvmNFT } from '@moralis/core';
import { operations } from '../../generated/types';
import { Camelize } from '../../utils/toCamelCase';
import { EvmPaginatedResolver, PaginatedOptions } from '../PaginatedResolver';

type operation = 'getAllTokenIds';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedOptions {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getAllTokenIdsResolver = new EvmPaginatedResolver({
  getPath: (params: Params) => `nft/${params.address}`,
  apiToResult: (data: ApiResult) =>
    data.result?.map((nft) => ({
      ...toCamelCase(nft),
      token: new EvmNFT({
        contractType: nft.contract_type,
        syncedAt: nft.synced_at,
        tokenAddress: nft.token_address,
        tokenId: nft.token_id,
        tokenUri: nft.token_uri ?? '',
        metadata: nft.metadata,
      }),
    })),
  resultToJson: (data) =>
    data?.map((nft) => ({
      ...nft,
      token: nft.token.toJSON(),
    })),
  parseParams: (params: Params): ApiParams => ({
    ...params,
    chain: params.chain ? EvmChain.create(params.chain).apiHex : 'eth',
    address: EvmAddress.create(params.address).lowercase,
  }),
});
