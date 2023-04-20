import {
  Core,
  Camelize,
  PaginatedOperation,
  maybe,
  toCamelCase,
  PaginatedResponseAdapter,
} from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNftTransfer, EvmNative } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTTransfers';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTTransfersRequest extends Camelize<Omit<RequestParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export type GetNFTTransfersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNFTTransfersJSONResponse = SuccessResponse;

export type GetNFTTransfersResponse = ReturnType<typeof deserializeResponse>;

export interface GetNFTTransfersResponseAdapter
  extends PaginatedResponseAdapter<GetNFTTransfersResponse, GetNFTTransfersJSONResponse['result']> {}

/** Get transfers of an NFT given a contract address and token ID. */
export const getNFTTransfersOperation: PaginatedOperation<
  GetNFTTransfersRequest,
  GetNFTTransfersJSONRequest,
  GetNFTTransfersResponse,
  GetNFTTransfersJSONResponse['result']
> = {
  method: 'GET',
  name: 'getNFTTransfers',
  id: 'getNFTTransfers',
  groupName: 'nft',
  urlPathPattern: '/nft/{address}/{tokenId}/transfers',
  urlPathParamNames: ['address', 'tokenId'],
  urlSearchParamNames: ['chain', 'format', 'limit', 'cursor', 'disableTotal'],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNFTTransfersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address).lowercase,
    format: request.format,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
    tokenId: request.tokenId,
    disable_total: request.disableTotal,
  };
}

function deserializeResponse(jsonResponse: GetNFTTransfersJSONResponse, request: GetNFTTransfersRequest, core: Core) {
  return (jsonResponse.result ?? []).map((transfer) =>
    EvmNftTransfer.create(
      {
        ...toCamelCase(transfer),
        chain: EvmChainResolver.resolve(request.chain, core),
        tokenAddress: EvmAddress.create(transfer.to_address),
        toAddress: EvmAddress.create(transfer.to_address),
        operator: transfer.operator ? EvmAddress.create(transfer.operator) : null,
        fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address) : null,
        value: transfer.value ? EvmNative.create(transfer.value, 'wei') : null,
        blockTimestamp: new Date(transfer.block_timestamp),
      },
      core,
    ),
  );
}

function serializeRequest(request: GetNFTTransfersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    limit: request.limit,
    cursor: request.cursor,
    address: EvmAddress.create(request.address).checksum,
    tokenId: request.tokenId,
    disableTotal: request.disableTotal,
  };
}

function deserializeRequest(jsonRequest: GetNFTTransfersJSONRequest, core: Core): GetNFTTransfersRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    format: jsonRequest.format,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address),
    tokenId: jsonRequest.tokenId,
    disableTotal: jsonRequest.disableTotal,
  };
}
