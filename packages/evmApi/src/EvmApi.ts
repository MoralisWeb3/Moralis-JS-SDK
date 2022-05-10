import { getTokenPriceResolver } from './resolvers/token';
import core, { ApiModule } from '@moralis/core';
import { getTokenBalancesResolver } from './resolvers/account';
import { getBlockResolver, getDateToBlockResolver, runContractFunctionResolver } from './resolvers/native';

export const BASE_URL = 'https://deep-index.moralis.io/api/v2';
export class MoralisEvmApi extends ApiModule {
  constructor() {
    super({
      name: 'evmApi',
      core,
      baseUrl: BASE_URL,
    });
  }

  get native() {
    return {
      runContractFunction: runContractFunctionResolver.fetch,
      getBlock: getBlockResolver.fetch,
      getDateToBlock: getDateToBlockResolver.fetch,
    };
  }
  get account() {
    return {
      getTokenBalances: getTokenBalancesResolver.fetch,
    };
  }
  get token() {
    return {
      getTokenPrice: getTokenPriceResolver.fetch,
    };
  }
}

const moralisEvmApi = new MoralisEvmApi();
export default moralisEvmApi;
