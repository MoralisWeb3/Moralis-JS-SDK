import { Operation, OperationResolver } from '@moralisweb3/api-utils';
import { ApiModule, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import {
  getBalanceOperation,
  getNFTMetadataOperation,
  getNFTsOperation,
  getPortfolioOperation,
  getSPLOperation,
  getTokenPriceOperation,
} from '@moralisweb3/sol-utils';

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
    // Nothing
  }

  public start() {
    // Nothing
  }

  private createFetcher<Request, Response, JSONResponse>(operation: Operation<Request, Response, JSONResponse>) {
    return new OperationResolver(operation, BASE_URL, this.core).fetch;
  }

  private readonly getBalance = this.createFetcher(getBalanceOperation);

  public readonly account = {
    getBalance: this.getBalance,
    getNFTs: this.createFetcher(getNFTsOperation),
    getPortfolio: this.createFetcher(getPortfolioOperation),
    getSPL: this.createFetcher(getSPLOperation),
    // Support for old naming
    /**
     * @deprecated Replaced by account.getBalance
     */
    balance: this.getBalance,
  };

  public readonly nft = {
    getNFTMetadata: this.createFetcher(getNFTMetadataOperation),
  };

  public readonly token = {
    getTokenPrice: this.createFetcher(getTokenPriceOperation),
  };
}
