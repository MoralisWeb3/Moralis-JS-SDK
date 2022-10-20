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

export const solApiRouter = Router();

// Routes
solApiRouter.get("token/:network/:address/price", solGetTokenPriceResolver)
solApiRouter.get("/nft/:network/:address/metadata", solGetNFTMetadataResolver)
solApiRouter.get("/account/:network/:address/tokens", solGetSPLResolver)
solApiRouter.get("/account/:network/:address/portfolio", solGetPortfolioResolver)
solApiRouter.get("/account/:network/:address/nft", solGetNFTsResolver)
solApiRouter.get("/account/:network/:address/balance", solGetBalanceResolver)