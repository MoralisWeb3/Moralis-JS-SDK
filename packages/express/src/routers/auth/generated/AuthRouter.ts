import { Router } from 'express';
import { 
  authRequestChallengeSolanaResolver,
  authRequestChallengeEvmResolver,
  authVerifyChallengeSolanaResolver,
  authVerifyChallengeEvmResolver,
} from './resolvers';

export class AuthRouter {

  static get Router() {

    const router = Router();

    router.post('/challenge/request/solana', authRequestChallengeSolanaResolver)
    router.post('/challenge/request/evm', authRequestChallengeEvmResolver)
    router.post('/challenge/verify/solana', authVerifyChallengeSolanaResolver)
    router.post('/challenge/verify/evm', authVerifyChallengeEvmResolver)
  
    return router;
  }
}