import { Core, Camelize, PaginatedOperation, toCamelCase, BigNumber, maybe } from '@moralisweb3/common-core';
import { Erc20Transfer, EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getWalletTokenTransfers';
type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

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
  id: 'getWalletTokenTransfers',
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

function getRequestUrlParams(request: GetWalletTokenTransfersRequest, core: Core) {
  return {
    address: EvmAddress.create(request.address, core).lowercase,
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
  core: Core,
) {
  return (jsonResponse.result || []).map((rawData) => {
    const data = toCamelCase(rawData);
    return Erc20Transfer.create({
      ...data,
      chain: EvmChainResolver.resolve(request.chain, core),
      address: EvmAddress.create(data.address, core),
      toAddress: EvmAddress.create(data.toAddress, core),
      fromAddress: EvmAddress.create(data.fromAddress, core),
      value: BigNumber.create(data.value),
      blockTimestamp: new Date(data.blockTimestamp),
    });
  });
}

function serializeRequest(request: GetWalletTokenTransfersRequest, core: Core) {
  return {
    address: EvmAddress.create(request.address, core).checksum,
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    cursor: request.cursor,
    toBlock: request.toBlock,
    fromBlock: request.fromBlock,
    fromDate: request.fromDate,
    toDate: request.toDate,
    subdomain: request.subdomain,
    limit: request.limit,
  };
}

function deserializeRequest(
  jsonRequest: GetWalletTokenTransfersJSONRequest,
  core: Core,
): GetWalletTokenTransfersRequest {
  return {
    address: EvmAddress.create(jsonRequest.address, core),
    chain: EvmChain.create(jsonRequest.chain, core),
    cursor: jsonRequest.cursor,
    toBlock: jsonRequest.toBlock,
    fromBlock: jsonRequest.fromBlock,
    fromDate: jsonRequest.fromDate,
    toDate: jsonRequest.toDate,
    subdomain: jsonRequest.subdomain,
    limit: jsonRequest.limit,
  };
}
