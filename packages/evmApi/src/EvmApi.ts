import core, { BaseApiClass } from '@moralis/core';
import { getTokenBalancesResolver } from './resolvers/account/getTokenBalances';
import { getBlockResolver } from './resolvers/native/getBlock';
import { getDateToBlockResolver } from './resolvers/native/getDateToBlock';
import { runContractFunctionResolver } from './resolvers/native/runContractFunction';

export const BASE_URL = 'https://deep-index.moralis.io/api/v2';
// TODO: get account when evm is connected
// TODO: update account when evm changes
// TODO: update chainId when evm changes
// TODO: otherwise get account/chainId from config
// TODO: set method in config on how to determine account: auth/connect/manual
// TODO: make call via server
// TODO: make call via api directly
// TODO: autogenerate code
// TODO: use generic rest handler in entire Moralis
// TODO: add start method to initialize
// TODO: get default chainId (get from web3, then get from default settings in config)
export class MoralisEvmApi extends BaseApiClass {
  constructor() {
    // TODO: read account from web3/auth
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
}

const moralisEvmApi = new MoralisEvmApi();
export default moralisEvmApi;
