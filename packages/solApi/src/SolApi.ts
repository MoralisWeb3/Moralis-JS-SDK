import { OperationResolver } from '@moralisweb3/api-utils';
import { ApiModule, Core, CoreProvider, Operation } from '@moralisweb3/common-core';
import {
  getBalanceOperation,
  getNFTMetadataOperation,
  getNFTsOperation,
  getPortfolioOperation,
  getSPLOperation,
  getTokenPriceOperation,
} from '@moralisweb3/common-sol-utils';

const BASE_URL = 'https://solana-gateway.moralis.io';

export class SolApi extends ApiModule {
  public static readonly moduleName = 'solApi';

  public static create(core?: Core): SolApi {
    return new SolApi(core ?? CoreProvider.getDefault());
  }

  private constructor(core: Core) {
    super(SolApi.moduleName, core, BASE_URL);
  }

  public setup() {
    // Nothing
  }

  public start() {
    // Nothing
  }

  private createFetcher<Request, JSONRequest, Response, JSONResponse>(
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ) {
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
