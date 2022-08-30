import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize } from '@moralisweb3/core';
import { Erc20Token, EvmAddress, EvmAddressish, EvmChainish } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getPairAddress';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = PathParams & QueryParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'token0_address' | 'token1_address'>> {
  chain?: EvmChainish;
  token0Address: EvmAddressish;
  token1Address: EvmAddressish;
}

export const getPairAddress = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getPairAddress',
    urlParams: ['token0Address', 'token1Address'],
    getUrl: (params: Params) => `/${params.token0Address}/${params.token1Address}/pairAddress`,
    // TODO: refactor to reduce complexity
    // eslint-disable-next-line complexity
    apiToResult: (data: ApiResult, params: Params) => ({
      //   ApiResult types generated all come as undefined which should not be the case TODO:
      token0: {
        token: Erc20Token.create({
          contractAddress: data.token0?.address ? EvmAddress.create(data.token0?.address) : '',
          decimals: data.token0?.decimals ?? 0,
          name: data.token0?.name ?? '',
          symbol: data.token0?.symbol ?? '',
          logo: data.token0?.logo,
          thumbnail: data.token0?.thumbnail,
          chain: EvmChainResolver.resolve(params.chain, core),
        }),
        blockNumber: data.token0?.block_number,
        validated: data.token0?.validated,
        createdAt: data.token0?.created_at ? new Date(data.token0?.created_at) : undefined,
      },
      token1: {
        token: new Erc20Token({
          contractAddress: data.token0?.address ? EvmAddress.create(data.token0?.address, core) : '',
          decimals: data.token1?.decimals ?? 0,
          name: data.token1?.name ?? '',
          symbol: data.token1?.symbol ?? '',
          logo: data.token1?.logo,
          thumbnail: data.token1?.thumbnail,
          chain: EvmChainResolver.resolve(params.chain, core),
        }),
        blockNumber: data.token1?.block_number,
        validated: data.token1?.validated,
        createdAt: data.token1?.created_at ? new Date(data.token1?.created_at) : undefined,
      },
      pairAddress: data.pairAddress ? EvmAddress.create(data.pairAddress) : undefined,
    }),
    resultToJson: (data) => ({
      ...data,
      token0: {
        ...data.token0,
        token: data.token0.token.toJSON(),
      },
      token1: {
        ...data.token1,
        token: data.token1.token.toJSON(),
      },
      pairAddress: data.pairAddress ? data.pairAddress.format() : undefined,
    }),
    parseParams: (params: Params): ApiParams => ({
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      token0_address: EvmAddress.create(params.token0Address, core).lowercase,
      token1_address: EvmAddress.create(params.token1Address, core).lowercase,
      exchange: params.exchange,
      to_block: params.toBlock,
      to_date: params.toDate,
    }),
  }),
);
