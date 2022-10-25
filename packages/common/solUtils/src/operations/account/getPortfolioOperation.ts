import { MoralisCore, Camelize, Operation } from '@moralisweb3/core';
import { SolAddress, SolAddressish, SolNative, SolNetwork, SolNetworkish } from '../../dataTypes';
import { SolNetworkResolver } from '../../SolNetworkResolver';
import { operations } from '../openapi';

type OperationName = 'getPortfolio';
type PathParams = operations[OperationName]['parameters']['path'];
type SuccessResponse = operations[OperationName]['responses']['200']['content']['application/json'];

// Exports

export interface GetPortfolioRequest extends Camelize<Omit<PathParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export type GetPortfolioJSONRequest = ReturnType<typeof serializeRequest>;

export interface GetPortfolioJSONResponse extends SuccessResponse {}

export type GetPortfolioResponse = ReturnType<typeof deserializeResponse>;

export const getPortfolioOperation: Operation<
  GetPortfolioRequest,
  GetPortfolioJSONRequest,
  GetPortfolioResponse,
  GetPortfolioJSONResponse
> = {
  method: 'GET',
  name: 'getPortfolio',
  groupName: 'account',
  urlPathParamNames: ['network', 'address'],
  urlPathPattern: '/account/{network}/{address}/portfolio',

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetPortfolioRequest, core: MoralisCore) {
  return {
    network: SolNetworkResolver.resolve(request.network, core),
    address: SolAddress.create(request.address).address,
  };
}

function deserializeResponse(jsonResponse: GetPortfolioJSONResponse) {
  return {
    nativeBalance: SolNative.create(jsonResponse.nativeBalance.lamports, 'lamports'),
    nfts: jsonResponse.nfts.map((nft) => {
      return {
        associatedTokenAddress: SolAddress.create(nft.associatedTokenAddress),
        mint: SolAddress.create(nft.mint),
      };
    }),
    tokens: jsonResponse.tokens.map((token) => {
      return {
        associatedTokenAddress: SolAddress.create(token.associatedTokenAddress),
        mint: SolAddress.create(token.mint),
        amount: SolNative.create(token.amountRaw, 'lamports'),
      };
    }),
  };
}

function serializeRequest(request: GetPortfolioRequest, core: MoralisCore) {
  return {
    address: SolAddress.create(request.address).address,
    network: SolNetworkResolver.resolve(request.network, core),
  };
}

function deserializeRequest(jsonRequest: GetPortfolioJSONRequest): GetPortfolioRequest {
  return {
    network: SolNetwork.create(jsonRequest.network),
    address: SolAddress.create(jsonRequest.address),
  };
}
