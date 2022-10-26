import { MoralisCore, Camelize, PaginatedOperation, toCamelCase, BigNumber, maybe, Operation } from '@moralisweb3/core';
import { Erc20Transfer, EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationName = 'getTokenAllowance';
type PathParams = operations[OperationName]['parameters']['path'];
type QueryParams = operations[OperationName]['parameters']['query'];
type SuccessResponse = operations[OperationName]['responses']['200']['content']['application/json'];

// Exports

export interface GetTokenAllowanceRequest
  extends Camelize<Omit<PathParams & QueryParams, 'chain' | 'owner_address' | 'spender_address' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
  ownerAddress: EvmAddressish;
  spenderAddress: EvmAddressish;
}

export type GetTokenAllowanceJSONRequest = ReturnType<typeof serializeRequest>;

export interface GetTokenAllowanceJSONResponse extends SuccessResponse {}

export type GetTokenAllowanceResponse = ReturnType<typeof deserializeResponse>;

export const getTokenAllowanceOperation: Operation<
  GetTokenAllowanceRequest,
  GetTokenAllowanceJSONRequest,
  GetTokenAllowanceResponse,
  GetTokenAllowanceJSONResponse
> = {
  method: 'GET',
  name: 'getTokenAllowance',
  groupName: 'token',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'providerUrl', 'ownerAddress', 'spenderAddress'],
  urlPathPattern: '/erc20/{address}/allowance',

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetTokenAllowanceRequest, core: MoralisCore) {
  return {
    address: String(request.address),
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    owner_address: EvmAddress.create(request.address).checksum,
    providerUrl: request.providerUrl,
    spender_address: EvmAddress.create(request.spenderAddress).checksum,
  };
}

// export const getTokenAllowance = createEndpointFactory((core) =>
//   createEndpoint({
//     name: 'getTokenAllowance',
//     urlParams: ['address'],
//     getUrl: (params: Params) => `/erc20/${params.address}/allowance`,
//     apiToResult: (data: ApiResult) => ({
//       allowance: BigNumber.create(data.allowance),
//     }),
//     resultToJson: (data) => ({
//       allowance: data.allowance.toString(),
//     }),
//     parseParams: (params: Params): ApiParams => ({
//       ...params,
// chain: EvmChainResolver.resolve(params.chain, core).apiHex,
// address: EvmAddress.create(params.address, core).lowercase,
// owner_address: EvmAddress.create(params.ownerAddress, core).lowercase,
// spender_address: EvmAddress.create(params.spenderAddress, core).lowercase,
//     }),
//   }),
// );
