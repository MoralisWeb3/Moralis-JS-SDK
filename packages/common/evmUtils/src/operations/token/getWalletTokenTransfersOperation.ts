import { MoralisCore, Camelize, PaginatedOperation, toCamelCase, BigNumber, maybe } from '@moralisweb3/common-core';
import { Erc20Transfer, EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationName = 'getWalletTokenTransfers';
type PathParams = operations[OperationName]['parameters']['path'];
type QueryParams = operations[OperationName]['parameters']['query'];
type SuccessResponse = operations[OperationName]['responses']['200']['content']['application/json'];

// Exports

export interface GetWalletTokenTransfersRequest extends Camelize<Omit<PathParams & QueryParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export type GetWalletTokenTransfersJSONRequest = ReturnType<typeof serializeRequest>;

export interface GetWalletTokenTransfersJSONResponse extends SuccessResponse {}

export type GetWalletTokenTransfersResponse = ReturnType<typeof deserializeResponse>;

export const getWalletTokenTransfersOperation: PaginatedOperation<
  GetWalletTokenTransfersRequest,
  GetWalletTokenTransfersJSONRequest,
  GetWalletTokenTransfersResponse,
  GetWalletTokenTransfersJSONResponse['result']
> = {
  method: 'GET',
  name: 'getWalletTokenTransfers',
  groupName: 'token',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'cursor', 'fromBlock', 'fromDate', 'limit', 'subdomain', 'toBlock', 'toDate'],
  urlPathPattern: '/{address}/erc20/transfers',

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetWalletTokenTransfersRequest, core: MoralisCore) {
  return {
    address: String(request.address),
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    cursor: request.cursor,
    limit: maybe(request.limit, String),
    to_block: maybe(request.toBlock, String),
    from_block: maybe(request.fromBlock, String),
    from_date: request.fromDate,
    to_date: request.toDate,
  };
}

function deserializeResponse(
  jsonResponse: GetWalletTokenTransfersJSONResponse,
  request: GetWalletTokenTransfersRequest,
  core: MoralisCore,
) {
  return (jsonResponse.result || []).map((transfer) => {
    return Erc20Transfer.create({
      ...toCamelCase(transfer),
      chain: EvmChainResolver.resolve(request.chain, core),
      address: EvmAddress.create(transfer.address, core),
      toAddress: EvmAddress.create(transfer.to_address, core),
      fromAddress: EvmAddress.create(transfer.from_address, core),
      value: BigNumber.create(transfer.value),
      blockTimestamp: new Date(transfer.block_timestamp),
    });
  });
}

function serializeRequest(request: GetWalletTokenTransfersRequest, core: MoralisCore) {
  return {
    address: request.address.toString(),
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    cursor: request.cursor,
    toBlock: request.toBlock,
    fromBlock: request.fromBlock,
    fromDate: request.fromDate,
    toDate: request.toDate,
  };
}

function deserializeRequest(
  jsonRequest: GetWalletTokenTransfersJSONRequest,
  core: MoralisCore,
): GetWalletTokenTransfersRequest {
  return {
    address: EvmAddress.create(jsonRequest.address, core),
    chain: EvmChain.create(jsonRequest.chain, core),
    cursor: jsonRequest.cursor,
    toBlock: jsonRequest.toBlock,
    fromBlock: jsonRequest.fromBlock,
    fromDate: jsonRequest.fromDate,
    toDate: jsonRequest.toDate,
  };
}
