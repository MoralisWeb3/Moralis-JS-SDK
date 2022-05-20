import { toCamelCase } from './../../utils/toCamelCase';
import { EvmChain, EvmChainish, EvmAddressish, EvmAddress, EvmNFT } from '@moralis/core';
import { operations } from '../../generated/types';
import { Camelize } from '../../utils/toCamelCase';
import { EvmPaginatedResolver, PaginatedOptions } from '../PaginatedResolver';

type operation = 'searchNFTs';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'addresses'>>, PaginatedOptions {
  chain?: EvmChainish;
  addresses?: EvmAddressish[];
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const searchNFTsResolver = new EvmPaginatedResolver({
  getPath: () => `nft/search`,
  apiToResult: (data: ApiResult) =>
    data.result?.map((nft) => ({
      // TODO: Explicitly define keys that don't exit in the NFT data type (currently some keys returned by the api are not specifies in swagger docs)
      ...toCamelCase(nft),
      token: new EvmNFT({
        contractType: nft.contract_type,
        syncedAt: nft.synced_at,
        tokenAddress: nft.token_address,
        tokenId: nft.token_id,
        tokenUri: nft.token_uri,
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
    addresses: params.addresses?.map((address) => EvmAddress.create(address).lowercase),
  }),
});
