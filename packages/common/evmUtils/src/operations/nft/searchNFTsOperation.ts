import { Core, Camelize, PaginatedOperation, maybe } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNft } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'searchNFTs';

type QueryParams = operations[OperationId]['parameters']['query'];

type RequestParams = QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface SearchNfTsRequest extends Camelize<Omit<RequestParams, 'chain' | 'addresses'>> {
  chain?: EvmChainish;
  addresses?: EvmAddressish[];
}

export type SearchNfTsJSONRequest = ReturnType<typeof serializeRequest>;

export type SearchNfTsJSONResponse = SuccessResponse;

export type SearchNfTsResponse = ReturnType<typeof deserializeResponse>;

export const searchNfTsOperation: PaginatedOperation<
  SearchNfTsRequest,
  SearchNfTsJSONRequest,
  SearchNfTsResponse,
  SearchNfTsJSONResponse['result']
> = {
  method: 'GET',
  name: 'searchNFTs',
  id: 'searchNFTs',
  groupName: 'nft',
  urlPathPattern: '/nft/search',
  urlPathParamNames: [],
  urlSearchParamNames: [
    'chain',
    'format',
    'q',
    'filter',
    'fromBlock',
    'toBlock',
    'fromDate',
    'toDate',
    'addresses',
    'cursor',
    'limit',
  ],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: SearchNfTsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    q: request.q,
    filter: request.filter,
    from_block: maybe(request.fromBlock, String),
    to_block: maybe(request.toBlock, String),
    from_date: request.fromDate,
    to_date: request.toDate,
    addresses: request.addresses?.map((address) => EvmAddress.create(address, core).lowercase),
    cursor: request.cursor,
    limit: maybe(request.limit, String),
  };
}

function deserializeResponse(jsonResponse: SearchNfTsJSONResponse, request: SearchNfTsRequest, core: Core) {
  return (jsonResponse.result ?? []).map((nft) => ({
    token: EvmNft.create(
      {
        chain: EvmChainResolver.resolve(request.chain, core),
        contractType: nft.contract_type,
        tokenAddress: nft.token_address,
        tokenId: nft.token_id,
        tokenUri: nft.token_uri,
        metadata: nft.metadata,
        tokenHash: nft.token_hash as string,
      },
      core,
    ),
    tokenHash: nft.token_hash,
    blockNumberMinted: nft.block_number_minted,
    lastMetadataSync: nft.last_metadata_sync ? new Date(nft.last_metadata_sync) : undefined,
    lastTokenUriSync: nft.last_token_uri_sync ? new Date(nft.last_token_uri_sync) : undefined,
    batchId: nft.batch_id,
    frozen: nft.frozen,
    frozenLogIndex: nft.frozen_log_index,
    imported: nft.imported,
    isValid: nft.is_valid,
    openseaLookup: nft.opensea_lookup,
    resyncing: nft.resyncing,
    syncing: nft.syncing,
    updatedAt: new Date(nft.updatedAt),
  }));
}

function serializeRequest(request: SearchNfTsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    q: request.q,
    filter: request.filter,
    fromBlock: request.fromBlock,
    toBlock: request.toBlock,
    fromDate: request.fromDate,
    toDate: request.toDate,
    addresses: request.addresses?.map((address) => EvmAddress.create(address, core).lowercase),
    cursor: request.cursor,
    limit: request.limit,
  };
}

function deserializeRequest(jsonRequest: SearchNfTsJSONRequest, core: Core): SearchNfTsRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    format: jsonRequest.format,
    q: jsonRequest.q,
    filter: jsonRequest.filter,
    fromBlock: jsonRequest.fromBlock,
    toBlock: jsonRequest.toBlock,
    fromDate: jsonRequest.fromDate,
    toDate: jsonRequest.toDate,
    addresses: maybe(jsonRequest.addresses, (addresses) =>
      addresses.map((address) => EvmAddress.create(address, core)),
    ),
    cursor: jsonRequest.cursor,
    limit: jsonRequest.limit,
  };
}
