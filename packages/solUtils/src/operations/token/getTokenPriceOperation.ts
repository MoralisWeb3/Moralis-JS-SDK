import { MoralisCore, Camelize } from '@moralisweb3/core';
import { SolAddress, SolAddressish, SolNative, SolNetworkish } from '../../dataTypes';
import { SolNetworkResolver } from '../../SolNetworkResolver';
import { operations } from '../openapi';
import { Operation } from '@moralisweb3/api-utils';

type OperationName = 'getTokenPrice';
type PathParams = operations[OperationName]['parameters']['path'];
type SuccessResponse = operations[OperationName]['responses']['200']['content']['application/json'];

// Exports

export interface GetTokenPriceRequest extends Camelize<Omit<PathParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export interface GetTokenPriceJSONResponse extends SuccessResponse {}

export type GetTokenPriceResponse = ReturnType<typeof createResponse>;

export const getTokenPriceOperation: Operation<GetTokenPriceRequest, GetTokenPriceResponse, GetTokenPriceJSONResponse> =
  {
    method: 'GET',
    name: 'getTokenPrice',
    groupName: 'token',
    urlPathParamNames: ['network', 'address'],
    urlPathPattern: '/token/{network}/{address}/price',

    parseUrlParams,
    createResponse,
  };

// Methods

function parseUrlParams(request: GetTokenPriceRequest, core: MoralisCore) {
  return {
    network: SolNetworkResolver.resolve(request.network, core),
    address: SolAddress.create(request.address).address,
  };
}

function createResponse(jsonResponse: GetTokenPriceJSONResponse) {
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
