import { ApiResolver } from '@moralisweb3/api';
import { Camelize, SolAddress, SolAddressish, SolNative, SolNetwork, SolNetworkish } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { BASE_URL } from '../../MoralisSolApi';

type Operation = 'getPortfolio';

type PathParams = operations[Operation]['parameters']['path'];

type ApiParams = PathParams;
type ApiResult = operations[Operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'network' | 'address'>> {
  network: SolNetworkish;
  address: SolAddressish;
}

export const getPortfolioResolver = new ApiResolver({
  name: 'getPortfolio',
  getUrl: (params: Params) => `${BASE_URL}/account/${params.network}/${params.address}/portfolio`,
  apiToResult: (data: ApiResult) => {
    return {
      nativeBalance: SolNative.create(data.nativeBalance.lamports, 'lamports'),
      nfts: data.nfts.map((nft) => {
        return {
          associatedTokenAddress: SolAddress.create(nft.associatedTokenAddress),
          mint: SolAddress.create(nft.mint),
        };
      }),
      tokens: data.tokens.map((token) => {
        return {
          associatedTokenAddress: SolAddress.create(token.associatedTokenAddress),
          mint: SolAddress.create(token.mint),
          amount: SolNative.create(token.amountRaw, 'lamports'),
        };
      }),
    };
  },
  resultToJson: (data) => {
    return {
      nativeBalance: data.nativeBalance.toJSON(),
      nfts: data.nfts.map((nft) => {
        return {
          associatedTokenAddress: nft.associatedTokenAddress.toJSON(),
          mint: nft.mint.toJSON(),
        };
      }),
      tokens: data.tokens.map((token) => {
        return {
          associatedTokenAddress: token.associatedTokenAddress.toJSON(),
          mint: token.mint.toJSON(),
          amount: token.amount.toJSON(),
        };
      }),
    };
  },
  parseParams: (params: Params): ApiParams => ({
    network: SolNetwork.create(params.network).network,
    address: SolAddress.create(params.address).address,
  }),
});
