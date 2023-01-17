import { CookieOptions, Router } from 'express';
import { 
  authRequestChallengeSolanaResolver,
  authRequestChallengeEvmResolver,
  authVerifyChallengeSolanaResolver,
  authVerifyChallengeEvmResolver,
} from './resolvers';
import { RequestChallengeEvmRequest, RequestChallengeSolanaRequest } from 'moralis/common-auth-utils';

export interface AuthConfig extends Omit<RequestChallengeEvmRequest | RequestChallengeSolanaRequest, 'address' | 'chainId'> {
  secret?: string;
  cookie?: CookieOptions;
}

export class AuthRouter {

  public static Router(config: AuthConfig) {

    const router = Router();

    router.post('/challenge/request/solana', (req: any, res, next) => authRequestChallengeSolanaResolver(req, res, next, config))
    router.post('/challenge/request/evm', (req: any, res, next) =>  authRequestChallengeEvmResolver(req, res, next, config))
    router.post('/challenge/verify/solana', (req: any, res, next) => authVerifyChallengeSolanaResolver(req, res, next, config))
    router.post('/challenge/verify/evm', (req: any, res, next) => authVerifyChallengeEvmResolver(req, res, next, config))
  
    return router;
  }
}