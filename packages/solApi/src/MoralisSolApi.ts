import { Endpoints } from '@moralisweb3/api-utils';
import { ApiModule, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { SolApiConfigSetup } from './config/SolApiConfigSetup';
import { getBalance } from './resolvers/account/getBalance';
import { getNFTs } from './resolvers/account/getNFTs';
import { getPortfolio } from './resolvers/account/getPortfolio';
import { getSPL } from './resolvers/account/getSPL';
import { getNFTMetadata } from './resolvers/nft/getNFTMetadata';
import { getTokenPrice } from './resolvers/token/getTokenPrice';

const BASE_URL = 'https://solana-gateway.moralis.io';

export class MoralisSolApi extends ApiModule {
  public static readonly moduleName = 'solApi';

  public static create(core?: MoralisCore): MoralisSolApi {
    return new MoralisSolApi(core ?? MoralisCoreProvider.getDefault());
  }

  private constructor(core: MoralisCore) {
    super(MoralisSolApi.moduleName, core, BASE_URL);
  }

  public setup() {
    SolApiConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }

  public readonly endpoints = new Endpoints(this.core, BASE_URL);

  private readonly getBalance = this.endpoints.createFetcher(getBalance);

  public readonly account = {
    getBalance: this.getBalance,
    getNFTs: this.endpoints.createFetcher(getNFTs),
    getPortfolio: this.endpoints.createFetcher(getPortfolio),
    getSPL: this.endpoints.createFetcher(getSPL),
    // Support for old naming
    /**
     * @deprecated Replaced by account.getBalance
     */
    balance: this.getBalance,
  };

  public readonly nft = {
    getNFTMetadata: this.endpoints.createFetcher(getNFTMetadata),
  };

  public readonly token = {
    getTokenPrice: this.endpoints.createFetcher(getTokenPrice),
  };
}
