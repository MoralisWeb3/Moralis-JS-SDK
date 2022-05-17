import { Camelize } from './../../utils/toCamelCase';
import { BigNumber } from 'ethers';
import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';
import { EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '@moralis/core';

type operation = 'getTokenAllowance';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'owner_address' | 'spender_address' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
  ownerAddress: EvmAddressish;
  spenderAddress: EvmAddressish;
}

export const getTokenAllowanceResolver = new EvmResolver({
  getPath: (params: Params) => `erc20/${EvmAddress.create(params.address).lowercase}/allowance`,
  apiToResult: (data: ApiResult) => ({
    allowance: BigNumber.from(data.allowance),
  }),
  resultToJson: (data) => ({
    allowance: data.allowance.toString(),
  }),
  parseParams: (params: Params): ApiParams => ({
    ...params,
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
    address: EvmAddress.create(params.address).lowercase,
    owner_address: EvmAddress.create(params.ownerAddress).lowercase,
    spender_address: EvmAddress.create(params.spenderAddress).lowercase,
  }),
});
