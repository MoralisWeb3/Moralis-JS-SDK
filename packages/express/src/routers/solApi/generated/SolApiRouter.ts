import { Router } from 'express';
import { 
  solGetBalanceResolver,
  solGetNFTsResolver,
  solGetPortfolioResolver,
  solGetSPLResolver,
  solGetNFTMetadataResolver,
  solGetTokenPriceResolver,
} from './resolvers';

export class SolApiRouter {

  static get Router() {

    const router = Router();

    router.get('/account/:network/:address/balance', solGetBalanceResolver)
    router.get('/account/:network/:address/nft', solGetNFTsResolver)
    router.get('/account/:network/:address/portfolio', solGetPortfolioResolver)
    router.get('/account/:network/:address/tokens', solGetSPLResolver)
    router.get('/nft/:network/:address/metadata', solGetNFTMetadataResolver)
    router.get('/token/:network/:address/price', solGetTokenPriceResolver)
  
    return router;
  }
}