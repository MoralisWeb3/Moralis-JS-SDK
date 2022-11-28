import express, { Request } from 'express';
import config from './config';
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

apiRouter.post('/evm-auth/request-message', apiLimiter, async (req, res) => {
  const { result } = await Moralis.Auth.requestMessage({
    domain: 'amazing.finance',
    address: req.body.address,
    uri: 'http://localhost:3000',
    timeout: 120,
    networkType: 'evm',
    chain: req.body.chain,
  });
  res.send(result);
});

apiRouter.post('/evm-auth/verify-message', apiLimiter, async (req, res) => {
  const { result } = await Moralis.Auth.verify({ message: req.body.message, signature: req.body.signature });
  res.send(result);
});
