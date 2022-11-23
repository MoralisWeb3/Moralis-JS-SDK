import { Core, Camelize, Operation, toCamelCase, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, Erc20Token } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getTokenMetadata';

type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetTokenMetadataRequest extends Camelize<Omit<RequestParams, 'chain' | 'addresses'>> {
  chain?: EvmChainish;
  addresses: EvmAddressish[];
}

export type GetTokenMetadataJSONRequest = ReturnType<typeof serializeRequest>;

export type GetTokenMetadataJSONResponse = SuccessResponse;

export type GetTokenMetadataResponse = ReturnType<typeof deserializeResponse>;

export interface GetTokenMetadataResponseAdapter
  extends ResponseAdapter<GetTokenMetadataResponse, GetTokenMetadataJSONResponse> {}

/** Get the metadata for a given token contract address (name, symbol, decimals, logo). */
export const getTokenMetadataOperation: Operation<
  GetTokenMetadataRequest,
  GetTokenMetadataJSONRequest,
  GetTokenMetadataResponse,
  GetTokenMetadataJSONResponse
> = {
  method: 'GET',
  name: 'getTokenMetadata',
  id: 'getTokenMetadata',
  groupName: 'token',
  urlPathPattern: '/erc20/metadata',
  urlSearchParamNames: ['chain', 'subdomain', 'providerUrl', 'addresses'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetTokenMetadataRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    addresses: request.addresses.map((address) => EvmAddress.create(address, core).lowercase),
    subdomain: request.subdomain,
    providerUrl: request.providerUrl,
  };
}

function deserializeResponse(jsonResponse: GetTokenMetadataJSONResponse, request: GetTokenMetadataRequest, core: Core) {
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

function serializeRequest(request: GetTokenMetadataRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    providerUrl: request.providerUrl,
    addresses: request.addresses.map((address) => EvmAddress.create(address, core).checksum),
  };
}

function deserializeRequest(jsonRequest: GetTokenMetadataJSONRequest, core: Core): GetTokenMetadataRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    subdomain: jsonRequest.subdomain,
    providerUrl: jsonRequest.providerUrl,
    addresses: jsonRequest.addresses.map((address) => EvmAddress.create(address, core)),
  };
}
