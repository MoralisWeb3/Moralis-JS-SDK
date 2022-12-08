import express from 'express';
import rateLimit, { MemoryStore } from 'express-rate-limit';
import Moralis from 'moralis';

const apiLimiter = rateLimit({
  // 1 minute
  windowMs: 60 * 1000,
  // Limit each IP to 10 requests per `window` (here, per minute)
  max: 10,
  // Return rate limit info in the `RateLimit-*` headers
  standardHeaders: true,
  store: new MemoryStore(),
});

export const apiRouter = express.Router();

apiRouter.get('/evm/:address/nft', apiLimiter, async (req, res) => {
  try {
    const data = await Moralis.EvmApi.nft.getWalletNFTs({ address: req.params.address, ...req.query });
    res.send(data.toJSON());
  } catch (e) {
    res.status(400).send(e);
  }
});

apiRouter.get('/evm/:address/erc20', apiLimiter, async (req, res) => {
  try {
    const data = await Moralis.EvmApi.token.getWalletTokenBalances({ address: req.params.address, ...req.query });
    res.send(data.toJSON());
  } catch (e) {
    res.status(400).send(e);
  }
});
