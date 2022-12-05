import { Core, Camelize, Operation, BigNumber, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getTokenAllowance';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetTokenAllowanceRequest
  extends Camelize<Omit<RequestParams, 'chain' | 'owner_address' | 'spender_address' | 'address'>> {
  chain?: EvmChainish;
  ownerAddress: EvmAddressish;
  spenderAddress: EvmAddressish;
  address: EvmAddressish;
}

export type GetTokenAllowanceJSONRequest = ReturnType<typeof serializeRequest>;

export type GetTokenAllowanceJSONResponse = SuccessResponse;

export type GetTokenAllowanceResponse = ReturnType<typeof deserializeResponse>;

export interface GetTokenAllowanceResponseAdapter
  extends ResponseAdapter<GetTokenAllowanceResponse, GetTokenAllowanceJSONResponse> {}

/** Get the amount which the spender is allowed to withdraw on behalf of the owner. */
export const getTokenAllowanceOperation: Operation<
  GetTokenAllowanceRequest,
  GetTokenAllowanceJSONRequest,
  GetTokenAllowanceResponse,
  GetTokenAllowanceJSONResponse
> = {
  method: 'GET',
  name: 'getTokenAllowance',
  id: 'getTokenAllowance',
  groupName: 'token',
  urlPathPattern: '/erc20/{address}/allowance',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'providerUrl', 'ownerAddress', 'spenderAddress'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetTokenAllowanceRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    providerUrl: request.providerUrl,
    owner_address: EvmAddress.create(request.ownerAddress, core).lowercase,
    spender_address: EvmAddress.create(request.spenderAddress, core).lowercase,
    address: EvmAddress.create(request.address, core).lowercase,
  };
}

function deserializeResponse(jsonResponse: GetTokenAllowanceJSONResponse) {
  return {
    allowance: BigNumber.create(jsonResponse.allowance),
  };
}

function serializeRequest(request: GetTokenAllowanceRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    providerUrl: request.providerUrl,
    ownerAddress: EvmAddress.create(request.ownerAddress, core).checksum,
    spenderAddress: EvmAddress.create(request.spenderAddress, core).checksum,
    address: EvmAddress.create(request.address, core).checksum,
  };
}

function deserializeRequest(jsonRequest: GetTokenAllowanceJSONRequest, core: Core): GetTokenAllowanceRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    providerUrl: jsonRequest.providerUrl,
    ownerAddress: EvmAddress.create(jsonRequest.ownerAddress, core),
    spenderAddress: EvmAddress.create(jsonRequest.spenderAddress, core),
    address: EvmAddress.create(jsonRequest.address, core),
  };
}
