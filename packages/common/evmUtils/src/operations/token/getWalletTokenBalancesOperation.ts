import { Core, Camelize, Operation, maybe, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, Erc20Value } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getWalletTokenBalances';
type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;
type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetWalletTokenBalancesRequest
  extends Camelize<Omit<RequestParams, 'chain' | 'token_addresses' | 'address'>> {
  chain?: EvmChainish;
  tokenAddresses?: EvmAddressish[];
  address: EvmAddressish;
}

export type GetWalletTokenBalancesJSONRequest = ReturnType<typeof serializeRequest>;

export type GetWalletTokenBalancesJSONResponse = SuccessResponse;

export type GetWalletTokenBalancesResponse = ReturnType<typeof deserializeResponse>;

export interface GetWalletTokenBalancesResponseAdapter
  extends ResponseAdapter<GetWalletTokenBalancesResponse, GetWalletTokenBalancesJSONResponse> {}

/** Get token balances for a specific wallet address. */
export const getWalletTokenBalancesOperation: Operation<
  GetWalletTokenBalancesRequest,
  GetWalletTokenBalancesJSONRequest,
  GetWalletTokenBalancesResponse,
  GetWalletTokenBalancesJSONResponse
> = {
  method: 'GET',
  name: 'getWalletTokenBalances',
  id: 'getWalletTokenBalances',
  groupName: 'token',
  urlPathPattern: '/{address}/erc20',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'subdomain', 'toBlock', 'tokenAddresses'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetWalletTokenBalancesRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    to_block: maybe(request.toBlock, String),
    token_addresses: maybe(request.tokenAddresses, (addresses) =>
      addresses.map((address) => EvmAddress.create(address, core).lowercase),
    ),
    address: EvmAddress.create(request.address, core).lowercase,
  };
}

function deserializeResponse(
  jsonResponse: GetWalletTokenBalancesJSONResponse,
  request: GetWalletTokenBalancesRequest,
  core: Core,
) {
  return (jsonResponse ?? []).map((token) =>
    Erc20Value.create(
      token.balance,
      {
        decimals: token.decimals,
        token: {
          decimals: token.decimals,
          name: token.name,
          symbol: token.symbol,
          contractAddress: token.token_address,
          logo: token.logo,
          thumbnail: token.thumbnail,
          chain: EvmChainResolver.resolve(request.chain, core),
        },
      },
      core,
    ),
  );
}

function serializeRequest(request: GetWalletTokenBalancesRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    tokenAddresses: maybe(request.tokenAddresses, (addresses) =>
      addresses.map((address) => EvmAddress.create(address, core).checksum),
    ),
    address: EvmAddress.create(request.address).checksum,
    subdomain: request.subdomain,
    toBlock: request.toBlock,
  };
}

function deserializeRequest(jsonRequest: GetWalletTokenBalancesJSONRequest, core: Core): GetWalletTokenBalancesRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    tokenAddresses: maybe(jsonRequest.tokenAddresses, (addresses) =>
      addresses.map((address) => EvmAddress.create(address, core)),
    ),
    address: EvmAddress.create(jsonRequest.address, core),
    subdomain: jsonRequest.subdomain,
    toBlock: jsonRequest.toBlock,
  };
}
