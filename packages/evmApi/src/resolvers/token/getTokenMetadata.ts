import { Erc20Input, Erc20Token, EvmChain, EvmChainish, EvmAddressish, EvmAddress } from '@moralis/core';
import { operations } from '../../generated/types';
import { getExtraData } from '../../utils/getExtraData';
import { Camelize, toCamelCase } from '../../utils/toCamelCase';
import { EvmResolver } from '../Resolver';

type operation = 'getTokenMetadata';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'addresses'>> {
  chain?: EvmChainish;
  addresses: EvmAddressish[];
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getTokenMetadataResolver = new EvmResolver({
  getPath: (params: ApiParams) => `erc20/metadata`,
  apiToResult: (data: ApiResult) =>
    data.map((token) => {
      const extras = getExtraData<Erc20Input, Camelize<ApiResult[0]>>(toCamelCase(token));
      return {
        ...extras,
        token: new Erc20Token({
          ...toCamelCase(token),
          contractAddress: token.address,
          // TODO: add chain info (or omit it from Erc20Token type),
          chain: 1,
        }),
        // address: extras.address,
      };
    }),
  resultToJson: (data) => data.map((item) => ({ ...item, token: item.token.toJSON() })),
  parseParams: (params: Params): ApiParams => ({
    providerUrl: params.providerUrl || undefined,
    subdomain: params.subdomain || undefined,
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
    addresses: params.addresses.map((address) => EvmAddress.create(address).format()),
  }),
});
