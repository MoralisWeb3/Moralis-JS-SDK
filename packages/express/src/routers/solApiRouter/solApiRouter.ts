import { Router } from 'express';
import { 
  // Resolvers import
solGetTokenPriceResolver,
solGetNFTMetadataResolver,
solGetSPLResolver,
solGetPortfolioResolver,
solGetNFTsResolver,
solGetBalanceResolver,
} from './resolvers';

export class solApiRouter {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public getRouter() {
    const router = Router();

    // Routes
    router.get("token/:network/:address/price", (req, res, next) =>  solGetTokenPriceResolver(req, res, next, this.apiKey))
    router.get("/nft/:network/:address/metadata", (req, res, next) =>  solGetNFTMetadataResolver(req, res, next, this.apiKey))
    router.get("/account/:network/:address/tokens", (req, res, next) =>  solGetSPLResolver(req, res, next, this.apiKey))
    router.get("/account/:network/:address/portfolio", (req, res, next) =>  solGetPortfolioResolver(req, res, next, this.apiKey))
    router.get("/account/:network/:address/nft", (req, res, next) =>  solGetNFTsResolver(req, res, next, this.apiKey))
    router.get("/account/:network/:address/balance", (req, res, next) =>  solGetBalanceResolver(req, res, next, this.apiKey))
  
    return router;
  }
}
