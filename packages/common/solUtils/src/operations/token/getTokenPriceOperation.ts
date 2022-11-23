import { Core, Camelize, Operation, MoralisApiError, ApiErrorCode, ResponseAdapter } from '@moralisweb3/common-core';
import { SolAddress, SolAddressish, SolNative, SolNetwork, SolNetworkish } from '../../dataTypes';
import { SolNetworkResolver } from '../../SolNetworkResolver';
import { operations } from '../openapi';

type OperationId = 'getTokenPrice';
type PathParams = operations[OperationId]['parameters']['path'];
type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetTokenPriceRequest extends Camelize<Omit<PathParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export type GetTokenPriceJSONRequest = ReturnType<typeof serializeRequest>;

export interface GetTokenPriceJSONResponse extends SuccessResponse {}

export type GetTokenPriceResponse = ReturnType<typeof deserializeResponse>;

export interface GetTokenPriceResponseAdapter
  extends ResponseAdapter<GetTokenPriceResponse, GetTokenPriceJSONResponse> {}

/** Gets the token price (usd and native) for a given contract address and network */
export const getTokenPriceOperation: Operation<
  GetTokenPriceRequest,
  GetTokenPriceJSONRequest,
  GetTokenPriceResponse,
  GetTokenPriceJSONResponse
> = {
  method: 'GET',
  name: 'getTokenPrice',
  id: 'getTokenPrice',
  groupName: 'token',
  urlPathParamNames: ['network', 'address'],
  urlPathPattern: '/token/{network}/{address}/price',

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetTokenPriceRequest, core: Core) {
  const network = SolNetworkResolver.resolve(request.network, core);

  if (network !== 'mainnet') {
    throw new MoralisApiError({
      message: `Incorrct value for 'network', getTokenPrice is only available on mainnet`,
      code: ApiErrorCode.INVALID_PARAMS,
    });
  }

  return {
    network: SolNetworkResolver.resolve(request.network, core),
    address: SolAddress.create(request.address).address,
  };
}

function deserializeResponse(jsonResponse: GetTokenPriceJSONResponse) {
  return {
    nativePrice: {
      value: SolNative.create(jsonResponse.nativePrice.value, 'solana'),
      decimals: jsonResponse.nativePrice.decimals,
      name: jsonResponse.nativePrice.name,
      symbol: jsonResponse.nativePrice.symbol,
    },
    usdPrice: jsonResponse.usdPrice,
    exchangeAddress: SolAddress.create(jsonResponse.exchangeAddress),
    exchangeName: jsonResponse.exchangeName,
  };
}

function serializeRequest(request: GetTokenPriceRequest, core: Core) {
  return {
    address: SolAddress.create(request.address).address,
    network: SolNetworkResolver.resolve(request.network, core),
  };
}

function deserializeRequest(jsonRequest: GetTokenPriceJSONRequest): GetTokenPriceRequest {
  return {
    network: SolNetwork.create(jsonRequest.network),
    address: SolAddress.create(jsonRequest.address),
  };
}
