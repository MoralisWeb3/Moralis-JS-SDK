import {
  Core,
  Camelize,
  PaginatedOperation,
  dateInputToDate,
  maybe,
  PaginatedResponseAdapter,
} from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNft } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getWalletNFTs';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetWalletNFTsRequest extends Camelize<Omit<RequestParams, 'chain' | 'token_addresses' | 'address'>> {
  chain?: EvmChainish;
  tokenAddresses?: EvmAddressish[];
  address: EvmAddressish;
}

export type GetWalletNFTsJSONRequest = ReturnType<typeof serializeRequest>;

export type GetWalletNFTsJSONResponse = SuccessResponse;

export type GetWalletNFTsResponse = ReturnType<typeof deserializeResponse>;

export interface GetWalletNFTsResponseAdapter
  extends PaginatedResponseAdapter<GetWalletNFTsResponse, GetWalletNFTsJSONResponse['result']> {}

/**
 * Get NFTs owned by a given address.
 * * The response will include status [SYNCED/SYNCING] based on the contracts being indexed.
 * * Use the token_address param to get results for a specific contract only
 * * Note results will include all indexed NFTs
 * * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested.
 */
export const getWalletNFTsOperation: PaginatedOperation<
  GetWalletNFTsRequest,
  GetWalletNFTsJSONRequest,
  GetWalletNFTsResponse,
  GetWalletNFTsJSONResponse['result']
> = {
  method: 'GET',
  name: 'getWalletNFTs',
  id: 'getWalletNFTs',
  groupName: 'nft',
  firstPageIndex: 1,
  urlPathPattern: '/{address}/nft',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'format', 'limit', 'tokenAddresses', 'cursor', 'normalizeMetadata'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetWalletNFTsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address, core).lowercase,
    format: request.format,
    limit: maybe(request.limit, String),
    token_addresses: request.tokenAddresses?.map((address) => EvmAddress.create(address, core).lowercase),
    cursor: request.cursor,
    normalizeMetadata: request.normalizeMetadata,
  };
}

function deserializeResponse(jsonResponse: GetWalletNFTsJSONResponse, request: GetWalletNFTsRequest, core: Core) {
  return (jsonResponse.result ?? []).map((nft) =>
    EvmNft.create({
      chain: EvmChainResolver.resolve(request.chain, core),
      contractType: nft.contract_type,
      tokenAddress: nft.token_address,
      tokenId: nft.token_id,
      tokenUri: nft.token_uri,
      metadata: nft.metadata,
      name: nft.name,
      symbol: nft.symbol,
      amount: nft.amount ? parseInt(nft.amount, 10) : undefined,
      blockNumberMinted: nft.block_number_minted,
      blockNumber: nft.block_number,
      ownerOf: EvmAddress.create(nft.owner_of, core),
      tokenHash: nft.token_hash,
      lastMetadataSync: dateInputToDate(nft.last_metadata_sync),
      lastTokenUriSync: dateInputToDate(nft.last_token_uri_sync),
    }),
  );
}

function serializeRequest(request: GetWalletNFTsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    limit: request.limit,
    tokenAddresses: request.tokenAddresses?.map((address) => EvmAddress.create(address, core).checksum),
    cursor: request.cursor,
    address: EvmAddress.create(request.address, core).checksum,
  };
}

function deserializeRequest(jsonRequest: GetWalletNFTsJSONRequest, core: Core): GetWalletNFTsRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    format: jsonRequest.format,
    limit: jsonRequest.limit,
    tokenAddresses: maybe(jsonRequest.tokenAddresses, (addresses) =>
      addresses.map((address) => EvmAddress.create(address, core)),
    ),
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address, core),
  };
}
