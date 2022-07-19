import { ApiModule, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { getBalanceResolver } from './resolvers/account/getBalance';
import { getNFTsResolver } from './resolvers/account/getNFTs';
import { getPortfolioResolver } from './resolvers/account/getPortfolio';
import { getSPLResolver } from './resolvers/account/getSPL';
import { getNFTMetadataResolver } from './resolvers/nft/getNFTMetadata';

export const BASE_URL = 'https://solana-gateway.moralis.io';

export class MoralisSolApi extends ApiModule {
  public static readonly moduleName = 'solApi';

  public static create(core?: MoralisCore): MoralisSolApi {
    return new MoralisSolApi(core ?? MoralisCoreProvider.getDefault());
  }

  private constructor(core: MoralisCore) {
    super(MoralisSolApi.moduleName, core, BASE_URL);
  }

  public setup() {
    // Nothing
  }

  public start() {
    // Nothing
  }

  public readonly account = {
    getBalance: getBalanceResolver.fetch,
    getNFTs: getNFTsResolver.fetch,
    getPortfolio: getPortfolioResolver.fetch,
    getSPL: getSPLResolver.fetch,
  };

  public readonly nft = {
    getNFTMetadata: getNFTMetadataResolver.fetch,
  };
}
