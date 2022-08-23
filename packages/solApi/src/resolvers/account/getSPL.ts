import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize } from '@moralisweb3/core';
import { SolAddress, SolAddressish, SolNative, SolNetworkish } from '@moralisweb3/sol-utils';
import { operations } from '../../generated/types';
import { SolNetworkResolver } from '../SolNetworkResolver';

type Operation = 'getSPL';

type PathParams = operations[Operation]['parameters']['path'];

type ApiParams = PathParams;
type ApiResult = operations[Operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'network' | 'address'>> {
  network?: SolNetworkish;
  address: SolAddressish;
}

export const getSPL = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getSPL',
    urlParams: ['network', 'address'],
    getUrl: (params: Params) => {
      // TODO: here should be: const network = SolNetworkResolver.resolve(params.network, core);
      // but it's not working with Endpoints.getDescriptors(). After changes described in Endpoints
      // please replace this line.
      const network = params.network ? params.network : SolNetworkResolver.resolve(undefined, core);
      return `/account/${network}/${params.address}/tokens`;
    },
    apiToResult: (data: ApiResult) => {
      return data.map((token) => {
        return {
          associatedTokenAddress: SolAddress.create(token.associatedTokenAddress),
          mint: SolAddress.create(token.mint),
          amount: SolNative.create(token.amountRaw, 'lamports'),
        };
      });
    },
    resultToJson: (data) => {
      return data.map((token) => {
        return {
          associatedTokenAddress: token.associatedTokenAddress.toJSON(),
          mint: token.mint.toJSON(),
          amount: token.amount.toJSON(),
        };
      });
    },
    parseParams: (params: Params): ApiParams => ({
      network: SolNetworkResolver.resolve(params.network, core),
      address: SolAddress.create(params.address).address,
    }),
  }),
);
