import { MoralisCore, Camelize } from '@moralisweb3/core';
import { SolAddress, SolAddressish, SolNative, SolNetworkish } from '../../dataTypes';
import { SolNetworkResolver } from '../../SolNetworkResolver';
import { operations } from '../openapi';
import { Operation } from '@moralisweb3/api-utils';

type OperationName = 'getPortfolio';
type PathParams = operations[OperationName]['parameters']['path'];
type SuccessResponse = operations[OperationName]['responses']['200']['content']['application/json'];

// Exports

export interface GetPortfolioRequest extends Camelize<Omit<PathParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export interface GetPortfolioJSONResponse extends SuccessResponse {}

export type GetPortfolioResponse = ReturnType<typeof createResponse>;

export const getPortfolioOperation: Operation<GetPortfolioRequest, GetPortfolioResponse, GetPortfolioJSONResponse> = {
  method: 'GET',
  name: 'getPortfolio',
  groupName: 'account',
  urlPathParamNames: ['network', 'address'],
  urlPathPattern: '/account/{network}/{address}/portfolio',

  parseUrlParams,
  createResponse,
};

// Methods

function parseUrlParams(request: GetPortfolioRequest, core: MoralisCore) {
  return {
    network: SolNetworkResolver.resolve(request.network, core),
    address: SolAddress.create(request.address).address,
  };
}

function createResponse(jsonResponse: GetPortfolioJSONResponse) {
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
