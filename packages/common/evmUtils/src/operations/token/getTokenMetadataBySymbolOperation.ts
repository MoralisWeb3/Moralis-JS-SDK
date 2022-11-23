import { Core, Camelize, Operation, toCamelCase, ResponseAdapter } from '@moralisweb3/common-core';
import { Erc20Token, EvmChain, EvmChainish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getTokenMetadataBySymbol';

type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetTokenMetadataBySymbolRequest extends Camelize<Omit<RequestParams, 'chain'>> {
  chain?: EvmChainish;
}

export type GetTokenMetadataBySymbolJSONRequest = ReturnType<typeof serializeRequest>;

export type GetTokenMetadataBySymbolJSONResponse = SuccessResponse;

export type GetTokenMetadataBySymbolResponse = ReturnType<typeof deserializeResponse>;

export interface GetTokenMetadataBySymbolResponseAdapter
  extends ResponseAdapter<GetTokenMetadataBySymbolResponse, GetTokenMetadataBySymbolJSONResponse> {}

/** Get metadata for a list of token symbols (name, symbol, decimals, logo). */
export const getTokenMetadataBySymbolOperation: Operation<
  GetTokenMetadataBySymbolRequest,
  GetTokenMetadataBySymbolJSONRequest,
  GetTokenMetadataBySymbolResponse,
  GetTokenMetadataBySymbolJSONResponse
> = {
  method: 'GET',
  name: 'getTokenMetadataBySymbol',
  id: 'getTokenMetadataBySymbol',
  groupName: 'token',
  urlPathPattern: '/erc20/metadata/symbols',
  urlSearchParamNames: ['chain', 'subdomain', 'symbols'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetTokenMetadataBySymbolRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    symbols: request.symbols,
  };
}

function deserializeResponse(
  jsonResponse: GetTokenMetadataBySymbolJSONResponse,
  request: GetTokenMetadataBySymbolRequest,
  core: Core,
) {
  return (jsonResponse ?? []).map((token) => {
    return {
      token: Erc20Token.create(
        {
          ...toCamelCase(token),
          contractAddress: token.address,
          chain: EvmChainResolver.resolve(request.chain, core),
        },
        core,
      ),
      blockNumber: token.block_number,
      validated: token.validated,
    };
  });
}

function serializeRequest(request: GetTokenMetadataBySymbolRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    symbols: request.symbols,
  };
}

function deserializeRequest(
  jsonRequest: GetTokenMetadataBySymbolJSONRequest,
  core: Core,
): GetTokenMetadataBySymbolRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    subdomain: jsonRequest.subdomain,
    symbols: jsonRequest.symbols,
  };
}
