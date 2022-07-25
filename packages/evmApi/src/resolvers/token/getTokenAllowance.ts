import { BigNumber } from 'ethers';
import { Camelize } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChainish } from '@moralisweb3/evm-utils';
import { ApiResolver } from '@moralisweb3/api-utils';
import { operations } from '../../generated/types';
import { BASE_URL } from '../../EvmApi';
import { EvmChainResolver } from '../EvmChainResolver';

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

export const getTokenAllowanceResolver = new ApiResolver({
  name: 'getTokenAllowance',
  getUrl: (params: Params) => `${BASE_URL}/erc20/${params.address}/allowance`,
  apiToResult: (data: ApiResult) => ({
    allowance: BigNumber.from(data.allowance),
  }),
  resultToJson: (data) => ({
    allowance: data.allowance.toString(),
  }),
  parseParams: (params: Params): ApiParams => ({
    ...params,
    chain: EvmChainResolver.resolve(params.chain).apiHex,
    address: EvmAddress.create(params.address).lowercase,
    owner_address: EvmAddress.create(params.ownerAddress).lowercase,
    spender_address: EvmAddress.create(params.spenderAddress).lowercase,
  }),
});
