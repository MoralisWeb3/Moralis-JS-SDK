import { Erc20Token, EvmAddress, EvmAddressish, EvmChainish } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { resolveDefaultChain } from '../../utils/resolveDefaultParams';
import { Camelize } from '../../utils/toCamelCase';
import { EvmResolver } from '../Resolver';

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

export const getPairAddressResolver = new EvmResolver({
  name: 'getPairAddress',
  getPath: (params: Params) => `${params.token0Address}/${params.token1Address}/reserves`,
  apiToResult: (data: ApiResult, params: Params) => ({
    //   ApiResult types generated all come as undefined which should not be the case TODO:
    token0: {
      token: new Erc20Token({
        contractAddress: data.token0?.address ? EvmAddress.create(data.token0?.address) : '',
        decimals: data.token0?.decimals ?? 0,
        name: data.token0?.name ?? '',
        symbol: data.token0?.symbol ?? '',
        logo: data.token0?.logo,
        thumbnail: data.token0?.thumbnail,
        chain: resolveDefaultChain(params.chain),
      }),
      blockNumber: data.token0?.block_number,
      validated: data.token0?.validated,
      created_at: data.token0?.created_at ? new Date(data.token0?.created_at) : undefined,
    },
    token1: {
      token: new Erc20Token({
        contractAddress: data.token0?.address ? EvmAddress.create(data.token0?.address) : '',
        decimals: data.token1?.decimals ?? 0,
        name: data.token1?.name ?? '',
        symbol: data.token1?.symbol ?? '',
        logo: data.token1?.logo,
        thumbnail: data.token1?.thumbnail,
        chain: resolveDefaultChain(params.chain),
      }),
      blockNumber: data.token1?.block_number,
      validated: data.token1?.validated,
      created_at: data.token1?.created_at ? new Date(data.token1?.created_at) : undefined,
    },
    pairAddress: data.pairAddress ? EvmAddress.create(data.pairAddress) : undefined,
  }),
  resultToJson: (data) => data,
  parseParams: (params: Params): ApiParams => ({
    chain: resolveDefaultChain(params.chain).apiHex,
    token0_address: EvmAddress.create(params.token0Address).lowercase,
    token1_address: EvmAddress.create(params.token1Address).lowercase,
    exchange: params.exchange,
    to_block: params.toBlock,
    to_date: params.toDate,
  }),
});
