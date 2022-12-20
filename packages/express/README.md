# @moralisweb3/express

Express Routers and Resolvers for Express applications.

## Demo Project

Please use Express Demo: [demos/express](https://github.com/MoralisWeb3/Moralis-JS-SDK/tree/main/demos/express)

## Router usage example:

```ts
import { EvmApiRouter, SolApiRouter } from '@moralisweb3/express'

export const apiRouter = express.Router();

apiRouter.use('/evm', EvmApiRouter.Router);
apiRouter.use('/solana', SolApiRouter.Router);
```

## Resolver usage example:

```ts
import { evmGetNFTTokenIdOwnersResolver } from '@moralisweb3/express'

export const apiRouter = express.Router();

apiRouter.get('/nft/:address/:tokenId/owners', evmGetNFTTokenIdOwnersResolver);
```
