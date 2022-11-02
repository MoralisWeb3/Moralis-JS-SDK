import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, Erc20Token } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getPairAddress';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetPairAddressRequest
  extends Camelize<Omit<RequestParams, 'chain' | 'token0_address' | 'token1_address'>> {
  chain?: EvmChainish;
  token0Address: EvmAddressish;
  token1Address: EvmAddressish;
}

export type GetPairAddressJSONRequest = ReturnType<typeof serializeRequest>;

export type GetPairAddressJSONResponse = SuccessResponse;

export type GetPairAddressResponse = ReturnType<typeof deserializeResponse>;

export const getPairAddressOperation: Operation<
  GetPairAddressRequest,
  GetPairAddressJSONRequest,
  GetPairAddressResponse,
  GetPairAddressJSONResponse
> = {
  method: 'GET',
  name: 'getPairAddress',
  id: 'getPairAddress',
  groupName: 'defi',
  urlPathPattern: '/{token0_address}/{token1_address}/pairAddress',
  urlPathParamNames: ['token0Address', 'token1Address'],
  urlSearchParamNames: ['chain', 'toBlock', 'toDate', 'exchange'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetPairAddressRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    to_block: request.toBlock,
    to_date: request.toDate,
    exchange: request.exchange,
    token0_address: EvmAddress.create(request.token0Address, core).lowercase,
    token1_address: EvmAddress.create(request.token1Address, core).lowercase,
  };
}

type TokenJSONResponse = GetPairAddressJSONResponse['token0'] | GetPairAddressJSONResponse['token1'];

function createErc20Token(token: TokenJSONResponse, core: Core, chain?: EvmChainish) {
  return Erc20Token.create(
    {
      contractAddress: token?.address ? EvmAddress.create(token?.address) : '',
      decimals: token?.decimals ?? 0,
      name: token?.name ?? '',
      symbol: token?.symbol ?? '',
      logo: token?.logo,
      thumbnail: token?.thumbnail,
      chain: EvmChainResolver.resolve(chain, core),
    },
    core,
  );
}

function deserializeResponse(jsonResponse: GetPairAddressJSONResponse, request: GetPairAddressRequest, core: Core) {
  return {
    //   ApiResult types generated all come as undefined which should not be the case TODO:
    token0: {
      token: createErc20Token(jsonResponse.token0, core, request.chain),
      blockNumber: jsonResponse.token0?.block_number,
      validated: jsonResponse.token0?.validated,
      createdAt: jsonResponse.token0?.created_at ? new Date(jsonResponse.token0?.created_at) : undefined,
    },
    token1: {
      token: createErc20Token(jsonResponse.token1, core, request.chain),
      blockNumber: jsonResponse.token1?.block_number,
      validated: jsonResponse.token1?.validated,
      createdAt: jsonResponse.token1?.created_at ? new Date(jsonResponse.token1?.created_at) : undefined,
    },
    pairAddress: jsonResponse.pairAddress ? EvmAddress.create(jsonResponse.pairAddress) : undefined,
  };
}

function serializeRequest(request: GetPairAddressRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    toBlock: request.toBlock,
    toDate: request.toDate,
    exchange: request.exchange,
    token0Address: EvmAddress.create(request.token0Address, core).lowercase,
    token1Address: EvmAddress.create(request.token1Address, core).lowercase,
  };
}

function deserializeRequest(jsonRequest: GetPairAddressJSONRequest, core: Core): GetPairAddressRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    toBlock: jsonRequest.toBlock,
    toDate: jsonRequest.toDate,
    exchange: jsonRequest.exchange,
    token0Address: EvmAddress.create(jsonRequest.token0Address, core),
    token1Address: EvmAddress.create(jsonRequest.token1Address, core),
  };
}
